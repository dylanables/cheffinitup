import { View, Text, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon, UsersIcon } from 'react-native-heroicons/outline';
import axios from 'axios';
import { GetFavorites, AddFavorite } from '../helpers/favorites';
import { getAuth } from 'firebase/auth';

export default function Recipes({recipes}) {
    const navigation = useNavigation();

  return (
    <View className="mx-4 mt-4">
      {!recipes ? 
      <Text className="mt-10">No recipes found.</Text> : 
      recipes.length == 0 ? (
          <Loading size="large" className="mt-20" />
      ) : (
          <MasonryList
              data={recipes}
              keyExtractor={(item) => item.idMeal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
              //refreshing={isLoadingNext}
              //onRefresh={() => refetch({first: ITEM_CNT})}
              onEndReachedThreshold={0.1}
              //onEndReached={() => loadNext(ITEM_CNT)}
          />
      )}
    </View>
  )
}

export function Recipe({recipe}) {

    const {strMeal, strMealThumb, idMeal} = recipe

    const [isLiked, setIsLiked] = useState(false)
    const [favs, setFavs] = useState([])
    const navigaation = useNavigation()
    const [recipeData, setRecipeData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
      console.log("TEST TEST TEST");
      getRecipe(idMeal);
      getFavorites();
      console.log("FAVS", favs)
    }, [])

    const auth = getAuth();

    const getFavorites = async () => {
      console.log("Calling getFavorites");
      const result = await GetFavorites(auth.currentUser.uid);
      console.log("result", result);
      setFavs(result?.Favorites ? result?.favorites : [])
    }

    const getRecipe = async (idMeal) => {
      try {
          const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
          if (response && response.data) {
              setRecipeData(response.data.meals[0])
              setLoading(false)
          }
      } catch (error) {
          console.error("Error:", error)
      }
  }

  const getIngredientsIndices = (recipeData) => {
    if (!recipeData) return [];
    let indices = [];

    for (let i = 1; i <= 20; i++) {
      if (recipeData['strIngredient'+i]) {
        indices.push(i)
      }
    }

    return indices
  }

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex)
    if (match && match[1]) {
      return match[1]
    }
    return null
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    AddFavorite(auth.currentUser.uid, idMeal)
  }

    return (
        <ScrollView 
      className="bg-white flex-1" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style={"light"} />

      {/* Image */}
      <View className="flex-row justify-center">
        <CachedImage
          uri={strMealThumb}
          style={{width: wp(100), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}
        />
      </View>

      {/* Back & like buttons */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity onPress={()=>navigaation.goBack()} className="p-2 rounded-full ml-5 bg-white">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#f44336" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLike} className="p-2 rounded-full mr-5 bg-white">
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={favs.includes(idMeal) ? "red": "gray"} />
        </TouchableOpacity>
      </Animated.View>

      {/* Recipe description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">

          <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
            <Text style={{fontSize: hp(3)}} className="font-bold flex-1 text-neutral-700">{recipeData?.strMeal}</Text>
            <Text style={{fontSize: hp(2)}} className="font-medium flex-1 text-neutral-500">{recipeData?.strArea}</Text>
          </Animated.View>

          {/* Details */}
          <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
            
            <View className="flex rounded-full bg-red-500 p-2">
              <View 
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <ClockIcon  size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text style={{fontSize: hp(2)}} className="font-bold text-white">45</Text>
                <Text style={{fontSize: hp(1.3)}} className="font-bold text-white">mins</Text>
              </View>
            </View>

            <View className="flex rounded-full bg-red-500 p-2">
              <View 
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <UsersIcon  size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text style={{fontSize: hp(2)}} className="font-bold text-white">3</Text>
                <Text style={{fontSize: hp(1.3)}} className="font-bold text-white">servings</Text>
              </View>
            </View>

            <View className="flex rounded-full bg-red-500 p-2">
              <View 
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <FireIcon  size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text style={{fontSize: hp(2)}} className="font-bold text-white">300</Text>
                <Text style={{fontSize: hp(1.3)}} className="font-bold text-white">calories</Text>
              </View>
            </View>

          </Animated.View>

          {/* Ingredients */}
          <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
            <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">Ingredients</Text>
            <View className="space-y-2 ml-3">
              {getIngredientsIndices(recipeData).map(i=>{
                return <View key={i} className="flex-row space-x-4">
                  <View style={{height: hp(1.5), width: hp(1.5)}} className="bg-red-500 rounded-full" />
                    <View key={i} className="flex-row space-x-2">
                      <Text style={{fontSize: hp(1.7)}} className="font-extrabold text-neutral-700">{recipeData['strMeasure'+i]}</Text>
                      <Text style={{fontSize: hp(1.7)}} className="font-medium text-neutral-600">{recipeData['strIngredient'+i]}</Text>
                    </View>
                </View>
              })}
            </View>
          </Animated.View>

          {/* Instructions */}
          <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
            <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">Instructions</Text>
            <Text style={{fontSize: hp(1.6)}} className="text-neutral-700">
              {
                recipeData?.strInstructions
              }
            </Text>
          </Animated.View>

          {/* Video */}
          {/*
          recipeData?.strYoutube && 
          <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
              {
                recipeData?.strYoutube && 
                <View className="space-y-4">
                  <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">Video</Text>
                  <View>
                  <YoutubeIframe
                    height={hp(30)}
                    videoId={getYoutubeVideoId(recipeData?.strYoutube)}
                  />
                  </View>
                </View>
              }
          </Animated.View>
          */}


        </View>
      )}


    </ScrollView>
    )
}

const RecipeCard = ({item, index, navigation}) => {
    let isEven = index % 2 == 0;
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(20)}>
            <View key={index}>
                <Pressable 
                    style={{width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0}} 
                    className="flex justify-center mb-4 space-y-1"
                    onPress={()=>navigation.navigate('Recipe', {...item})}
                >
                    <CachedImage 
                        uri={item.strMealThumb} 
                        style={{width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35}}
                        className="bg-black/5"
                    />
                    <Text style={{fontSize: hp(1.5)}} className="font-semibold ml-2 text-neutral-600">
                        {item.strMeal.length > 20 ? item.strMeal.slice(0,20) + "..." : item.strMeal}
                    </Text>
                </Pressable>
            </View>
        </Animated.View>
    )
}