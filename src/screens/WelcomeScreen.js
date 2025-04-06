import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

const navigation = useNavigation()

useEffect(()=>{
    setTimeout(()=>navigation.navigate('Onboard'), 2500)
}, [])

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-red-500">
        <StatusBar style='light' />

        <View className="mb-5">
            <Image source={require('../../assets/cheffin-logo.png')} style={{width: hp(20), height: hp(20)}} />
        </View>

        <View className="flex items-center space-y-2">
            <Text style={{fontSize: hp(7)}} className="font-bold text-white tracking-widest">Cheffin It Up</Text>
            <Text style={{fontSize: hp(2)}} className="font-medium text-white tracking-widest">Find, store, and share new recipes</Text>
        </View>
    </View>
  )
}