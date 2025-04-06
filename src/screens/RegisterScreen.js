import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged, EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { useState } from 'react';
import {ArrowLeftCircleIcon} from 'react-native-heroicons/outline';
import { FontAwesome } from "@expo/vector-icons";

export default function RegisterScreen() {

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

const signUp = async () => {
    console.log("Register button pressed");
    if (auth.currentUser && auth.currentUser.isAnonymous) {
        console.log("Upgrading anon account");
        try {
            const credential = EmailAuthProvider.credential(email, password);
            linkWithCredential(auth.currentUser, credential)
                .then((usercred) => {
                    const user = usercred.user;
                    console.log("Anonymous account successfully upgraded", user);
                    navigation.navigate('BottomTabs')
                }).catch((error) => {
                    console.log("Error upgrading anonymous account", error);
                });
        } catch (error) {
            console.log(error);
            alert("Failed to link your new account: " + error.message);
        }
    } else {
        console.log("Creating new account");
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            if (user) navigation.navigate('BottomTabs');
        } catch (error) {
            console.log(error);
            alert("Sign in failed: " + error.message);
        }
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
            Register to save your recipes!
        </Text>

        {/* Input Fields */}
        <TextInput value={email} onChangeText={setEmail} className="border border-gray-300 p-5 rounded-lg text-base mb-4" placeholder="Email" keyboardType="email-address" />
        <TextInput value={password} onChangeText={setPassword} className="border border-gray-300 p-5 rounded-lg text-base mb-4" placeholder="Password" secureTextEntry />

        {/* Register Button */}
        <TouchableOpacity onPress={signUp} className="bg-red-500 p-5 rounded-lg">
            <Text className="text-white text-center font-semibold">Register</Text>
        </TouchableOpacity>

        {/* Social Login */}
        <View className="flex-row items-center space-x-4 my-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="text-gray-500 px-3">Or register with</Text>
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

        {/* Login Navigation */}
        <Text className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Text className="text-blue-500" onPress={() => navigation.navigate("Login")}>
            Login Now
            </Text>
        </Text>

    </View>
  )
}