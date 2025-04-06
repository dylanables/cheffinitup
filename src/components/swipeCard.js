import { View, Text, Image, ImageBackground, Pressable, Modal, Button } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';
import { Recipe, RecipeCard } from './recipes';
import RecipeScreen from '../screens/RecipeScreen';

export default function SwipeCard(props) {
    const {strMeal, strMealThumb, idMeal} = props.recipe;

    console.log(props.recipe)


    const navigation = useNavigation()
  return (
        <Pressable 
            onPress={()=>navigation.navigate("Recipe", {...props.recipe})} 
            className="min-w-full min-h-full justify-center items-center flex-1"
        >
            <View className="w-[95%] h-[80%] rounded-xl shadow-xl">
                <ImageBackground
                    source={{uri: strMealThumb}}
                    className="w-full h-full rounded-xl overflow-hidden flex justify-end p-5"
                >
                    <Text style={{fontSize: hp(3.5)}} className="text-white font-bold">{strMeal}</Text>
                    <Text style={{fontSize: hp(2)}} className="text-white font-light leading-relaxed">Some text here</Text>
                </ImageBackground>
            </View>   
        </Pressable>
  )
}