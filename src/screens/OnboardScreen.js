import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useState } from 'react';

export default function OnboardScreen() {

const navigation = useNavigation()

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // user is signed in already, redirect to homepage
    navigation.navigate('BottomTabs');
  }
});

handleGuest = () => {
  signInAnonymously(auth)
    .then(() => {
      // signed in anonymously
      navigation.navigate('BottomTabs');
    })
    .catch((error) => {
      console.log("Error: " + error)
    });
}

  return (
    <View className="flex-1 justify-center items-center px-6">
        <StatusBar style='light' />

        <Image source={require('../../assets/cheffin-logo.png')} style={{width: hp(20), height: hp(20)}} className="mb-6" resizeMode="cover" />

        <TouchableOpacity onPress={()=>navigation.navigate('Login')} className="bg-red-500 p-4 rounded-lg w-full mb-4">
            <Text className="text-white text-center font-semibold">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Register')} className="border border-gray-300 p-4 rounded-lg w-full mb-4">
            <Text className="text-center font-semibold">Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGuest} className="p-4 w-full mb-4">
            <Text className="text-center">Continue as a guest</Text>
        </TouchableOpacity>
    </View>
  )
}