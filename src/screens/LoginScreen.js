import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import {ArrowLeftCircleIcon} from 'react-native-heroicons/outline';
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {

const navigation = useNavigation()

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user && !user.isAnonymous) {
    // user is signed in already, redirect to homepage
    navigation.navigate('BottomTabs');
  }
});

const signIn = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (user) navigation.navigate('BottomTabs');
    } catch (error) {
        console.log(error);
        alert("Sign in failed: " + error.message);
    }
}

  return (
    <View className="flex-1 bg-white justify-center px-6">
        <StatusBar style='light' />

        {/* Back button */}
        <TouchableOpacity onPress={()=>navigation.goBack()} className="absolute top-14 left-6">
            <ArrowLeftCircleIcon size={32} color="grey" />
        </TouchableOpacity>

        {/* Header */}
        <Text className="text-4xl font-semibold text-center mb-6">
            Login to view your recipes!
        </Text>

        {/* Input Fields */}
        <TextInput value={email} onChangeText={setEmail} className="border border-gray-300 p-5 rounded-lg text-base mb-4" placeholder="Email" keyboardType="email-address" />
        <TextInput value={password} onChangeText={setPassword} className="border border-gray-300 p-5 rounded-lg text-base mb-4" placeholder="Password" secureTextEntry />

        {/* Login Button */}
        <TouchableOpacity onPress={signIn} className="bg-red-500 p-5 rounded-lg">
            <Text className="text-white text-center font-semibold">Login</Text>
        </TouchableOpacity>

        {/* Social Login */}
        <View className="flex-row items-center space-x-4 my-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="text-gray-500 px-3">Or login with</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
        </View>
        <View className="flex-row w-full">
            <TouchableOpacity className="flex-1 mx-2 py-4 bg-gray-100 rounded-lg flex-row items-center justify-center">
                <FontAwesome name="facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 mx-2 py-4 bg-gray-100 rounded-lg flex-row items-center justify-center">
                <FontAwesome name="google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 mx-2 py-4 bg-gray-100 rounded-lg flex-row items-center justify-center">
                <FontAwesome name="apple" size={24} color="black" />
            </TouchableOpacity>
        </View>

        {/* Register Navigation */}
        <Text className="text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Text className="text-blue-500" onPress={() => navigation.navigate("Register")}>
            Register Now
            </Text>
        </Text>

    </View>
  )
}