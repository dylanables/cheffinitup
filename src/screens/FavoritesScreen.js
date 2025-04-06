import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {ArrowsRightLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories'
import Recipes from '../components/recipes'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/navbar'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "../navigation/BottomTabs";
import GuestAlert from '../components/guestAlert'
import { GetFavorites } from '../helpers/favorites'
import { collection, doc, addDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { SafeAreaView } from 'react-native-safe-area-context'

export default function FavoritesScreen() {

    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState("Beef");
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("");
    const [user, setUser] = useState();
    const [isAnonymous, setIsAnonymous] = useState(true)
    const [favs, setFavs] = useState([]);
    const [favRecipeData, setFavRecipeData] = useState([])
    const [loading, setLoading] = useState();
    const [error, setError] = useState(null);

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            setUser(user);
            if (user.isAnonymous == false) {
                setIsAnonymous(false);
            }
        } else {
            // User is signed out
            navigation.navigate("Onboard");
        }
    });

    console.log("favs", favs)
    console.log("length", favs.length)

    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const docRef = doc(db, "Favorites", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            let fetchedRecipes = [];

            if (docSnap.exists()) {
                const docResult = docSnap.data().likedRecipes;
                console.log(docResult)

                fetchedRecipes = await Promise.all(
                    docResult.map(async (doc) => {
                        const result = await getRecipe(doc);
                        return result;
                    }) 
                );
                
            }
    
            console.log("Fetched", fetchedRecipes);
            setFavs(fetchedRecipes);
          } catch (err) {
            setError(err.message);
            console.log("Error:", err)
          } finally {
            setLoading(false);
          }
        };

        fetchRecipes();
    }, []);


    const GetFavs = async (uid) => {
        console.log("UID: " + uid);
        const result = await GetFavorites(uid);
        console.log("Result: ", result);
        const fetchedRecipes = [];
        result.forEach(res => {
            fetchedRecipes.push(res);
        });
        setFavs(fetchedRecipes);
    }

    const handleChangeCategory = category => {
        getRecipes(category);
        setActiveCategory(category)
        setRecipes([])
        setQuery("")
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
            if (response && response.data) {
                setCategories(response.data.categories)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    const getRecipe = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            if (response && response.data) {
                return response.data.meals[0]
            }
        } catch (error) {
            console.error("Error:", error)
            return error;
        }
      }

    const getRecipes = async (activeCategory="Beef") => {
        if (activeCategory == "Liked") {
            console.log("LIKED CAT CLICKED")
            try {
                const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=Side`)
                if (response && response.data) {
                    setRecipes(response.data.meals)
                }
            } catch (error) {
                console.error("Error:", error)
            }
        } else {
            console.log("OTHER CAT CLICKED")
            try {
                const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`)
                if (response && response.data) {
                    setRecipes(response.data.meals)
                }
            } catch (error) {
                console.error("Error:", error)
            }
        }
    }

    const getRecipesBySearch = async (query) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            if (response && response.data) {
                setRecipes(response.data.meals)
                setActiveCategory(null)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

  return (
    <View className="flex-1 bg-white">
        <StatusBar style='dark' />
        <SafeAreaView>

            {/* Disclaimer if anonymous */
                isAnonymous &&
                <GuestAlert />
            }

            {/* Heading text */}
            <View className="mx-4 space-y-2 mb-2">
                <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Saved Recipes</Text>
            </View>

            {/* Search bar
            <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                <TextInput 
                    placeholder='Search recipes'
                    placeholderTextColor={'gray'}
                    style={{fontSize: hp(1.7)}}
                    className="flex-1 text-base mb-1 pl-3 tracking-wider"
                    onChangeText={newQuery => setQuery(newQuery)}
                    value={query} />
                <View className="bg-white rounded-full p-3">
                    <TouchableOpacity onPress={()=>getRecipesBySearch(query)}>
                        <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Categories 
            <View>
                {
                    categories.length > 0 && 
                    <Categories 
                        categories={categories} 
                        activeCategory={activeCategory} 
                        handleChangeCategory={handleChangeCategory}
                    />
                }
            </View>

            {/* Recipes 
            <View>
                <Recipes recipes={recipes} />
            </View>

            */}

            <View>
                <FlatList
                data={favs}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('Recipe', {...item})}>
                    <View className="flex-row items-center p-4 border-b border-gray-300">
                        {/* Image */}
                        <Image
                            source={{ uri: item.strMealThumb }}
                            style={{ width: 50, height: 50 }}
                            className="rounded-full"
                        />
                        <View className="ml-4 flex-1">
                            {/* Title */}
                            <Text className="text-lg font-semibold">{item.strMeal}</Text>

                            {/* Cooking Time */}
                            <Text className="text-gray-500 text-sm">Cooking time: 30{item.cookingTime} mins</Text>

                            {/* Additional details */}
                            <Text className="text-gray-500 text-xs">{item.category}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                )}
                />
            </View>
        </SafeAreaView>
    </View>
  )
}