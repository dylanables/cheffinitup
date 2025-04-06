import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { categoryData } from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image'
import { HeartIcon, SparklesIcon } from 'react-native-heroicons/solid'

export default function Categories({categories, activeCategory, handleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(1000).springify()}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4 mt-4 mr-4"
            contentContainerStyle={{paddingHorizontal:  15}}
        >
            <LikedCat activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} className="mr-0 p-0" />
            
        {
            categories.map((cat, index) => {
                let isActive = cat.strCategory == activeCategory;

                return (
                    <TouchableOpacity
                        key={index+1}
                        onPress={() => handleChangeCategory(cat.strCategory)}
                        className="flex items-center space-y-1 mr-5"
                    >
                        <View style={{height: hp(7), width: hp(7)}} className={`justify-center items-center rounded-full p-[6px] ${isActive ? 'bg-red-500' : 'bg-black/10'}`}>
                            <CachedImage 
                                uri={ cat.strCategoryThumb}
                                style={{height: hp(6), width: hp(6)}}
                                className="rounded-full" 
                            />
                        </View>
                        <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                            {cat.strCategory}
                        </Text>
                    </TouchableOpacity>
                )
            })
                
        }
        </ScrollView>
    </Animated.View>
  )
}

const LikedCat = ({activeCategory, handleChangeCategory}) => {
    let isActive = activeCategory == "Liked";
    return (
        <TouchableOpacity
            key={0}
            onPress={() => handleChangeCategory("Liked")}
            className="flex items-center space-y-1 mr-5"
        >
            <View style={{height: hp(7), width: hp(7)}} className={`justify-center items-center rounded-full p-[6px] ${isActive ? 'bg-red-500' : 'bg-black/10'}`}>
                <SparklesIcon
                    size={hp(3.5)}
                    className="rounded-full"
                    color={isActive ? "#fff" : "#606060"}
                />
            </View>
            <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                For Me
            </Text>
        </TouchableOpacity>
    )
}