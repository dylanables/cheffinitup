import 'react-native-gesture-handler'
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Pressable, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP} from 'react-native-responsive-screen'
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories'
import Recipes from '../components/recipes'
import axios from 'axios'
import SwipeCard from '../components/swipeCard'
import Navbar from '../components/navbar'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, useAnimatedGestureHandler, useDerivedValue, interpolate, runOnJS } from 'react-native-reanimated'
import {GestureHandlerRootView, PanGestureHandler} from 'react-native-gesture-handler'
import Like from '../../assets/like.png'
import Nope from '../../assets/nope.png'

export default function SwipeScreen() {

    {/*
    const recipes = [
        {
            name: "Recipe Name 1",
            image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
            desc: "Some description",
        },
        {
            name: "Recipe Name 2",
            image: "https://www.themealdb.com/images/media/meals/8x09hy1560460923.jpg",
            desc: "Some other description",
        },
        {
            name: "Recipe Name 3",
            image: "https://www.themealdb.com/images/media/meals/0206h11699013358.jpg",
            desc: "Some other description",
        },
        {
            name: "Recipe Name 4",
            image: "https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg",
            desc: "Some other description",
        },
    ]
    */}

    const [activeCategory, setActiveCategory] = useState("Beef");
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(currentIndex + 1);

    const currentRecipe = recipes[currentIndex];
    const nextRecipe = recipes[nextIndex];
    console.log("currentIndex", currentIndex)
    console.log("nextIndex", nextIndex)
    console.log("currentRecipe", currentRecipe)
    console.log("nextRecipe", nextRecipe)


    const {width: screenWidth} = useWindowDimensions();
    const translateX = useSharedValue(0);
    const rotate = useDerivedValue(() => interpolate(
        translateX.value,
        [0, 2*screenWidth],
        [0, 60],
    ) + 'deg');
    const cardStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: translateX.value},
            {rotate: rotate.value},
        ],
    }));
    const nextCardStyle = useAnimatedStyle(() => ({
        transform: [
            {scale: interpolate(
                translateX.value,
                [-2*screenWidth, 0, 2*screenWidth],
                [1, 0.9, 1],
            )}
        ],
        opacity: interpolate(
            translateX.value,
            [-2*screenWidth, 0, 2*screenWidth],
            [1, 0.6, 1],
        )
    }));
    const likeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            translateX.value,
            [0, screenWidth/4],
            [0, 1],
        )
    }));
    const nopeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            translateX.value,
            [-screenWidth/4, 0],
            [1, 0],
        )
    }));
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            console.log("Touch started")
            context.startX = translateX.value
        },
        onActive: (event, context) => {
            translateX.value = context.startX + event.translationX
            console.log("Touch x", event.translationX)
        },
        onEnd: (event) => {
            console.log("Touch ended")

            if (Math.abs(event.velocityX) < 800) {
                translateX.value = withSpring(0);
                return;
            }

            {/* Throw away card */}
            translateX.value = withSpring(
                Math.sign(event.velocityX) * 2 * screenWidth,
                {},
                () => {
                    runOnJS(setCurrentIndex)(currentIndex + 1);
                    runOnJS(setNextIndex)(nextIndex + 1);
                },
            );
        }
    });

    useEffect(()=>{
        translateX.value = 0;
    }, [currentIndex, nextIndex]);

    
    useEffect(()=>{
        getCategories();
        getRecipes();
    }, [])

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

    const getRecipes = async (activeCategory="Beef") => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`)
            if (response && response.data) {
                setRecipes(response.data.meals)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    {/*
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
    */}

  return (
    <View className="flex-1 bg-white">
        <StatusBar style='dark' />
        <View className="space-y-6 pt-14 min-h-full flex-col">

            {/* Search bar */}
            {/*
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
            */}

            {/* Categories */}
            <View className="mt-5">
                {
                    categories.length > 0 && 
                    <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
                }
            </View>

            {/* Recipes */}
            <View className="min-w-full w-full min-h-fit flex-1">

                {nextRecipe &&
                <Animated.View style={nextCardStyle} className="w-full flex-1 absolute top-0 left-0 right-0 bottom-0">
                    <SwipeCard recipe={nextRecipe} />
                </Animated.View>
                }
                
                {currentRecipe &&
                <GestureHandlerRootView>
                    <PanGestureHandler onGestureEvent={gestureHandler}>
                        <Animated.View style={cardStyle} className="w-full flex-1">
                            <Animated.Image source={Like} style={likeStyle} className="w-36 h-36 absolute top-24 left-3 z-10" resizeMode='contain' />
                            <Animated.Image source={Nope} style={nopeStyle} className="w-36 h-36 absolute top-24 right-3 z-10" resizeMode='contain'  />
                            <SwipeCard recipe={currentRecipe} />
                        </Animated.View>
                    </PanGestureHandler>
                </GestureHandlerRootView>
                }

            </View>
            
        </View>
    </View>
  )
}