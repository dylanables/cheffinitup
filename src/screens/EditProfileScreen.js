import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Pressable, SafeAreaView, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {ChevronRightIcon, PencilSquareIcon, ShieldExclamationIcon, NoSymbolIcon, UserGroupIcon, ArrowRightStartOnRectangleIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories'
import Recipes from '../components/recipes'
import axios from 'axios'
import { NavigationContainerRefContext, useNavigation } from '@react-navigation/native';
import Navbar from '../components/navbar'
import { getAuth, onAuthStateChanged, updateProfile, updateEmail} from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "../navigation/BottomTabs";
import {ArrowLeftCircleIcon} from 'react-native-heroicons/outline';
import { FontAwesome } from "@expo/vector-icons";

export default function EditProfileScreen() {

    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [name, setName] = useState(auth.currentUser.displayName);
    const [email, setEmail] = useState(auth.currentUser.email);
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            setUser(user);
        } else {
            // User is signed out
            navigation.navigate("Onboard");
        }
    });

    const handleEdit = async () => {
        updateEmail(auth.currentUser, email).then(() => {
            console.log("Email updated")
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                console.log("Profile updated")
                navigation.navigate("Profile");
            }).catch((error) => {
                console.log("Error editing profile: " + error)
            });
          }).catch((error) => {
            console.log("Error updating email: " + error)
          });
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
            Edit Profile
        </Text>

        {/* Input Fields */}
        <TextInput value={name} onChangeText={setName} className="border border-gray-300 p-5 rounded-lg text-base mb-4" placeholder="Name (optional)" />
        <TextInput value={email} onChangeText={setEmail} className="border border-gray-300 p-5 rounded-lg text-base mb-4" placeholder="Email" keyboardType="email-address" />
        <TextInput value={password} onChangeText={setPassword} className="border border-gray-300 p-5 rounded-lg text-base mb-4" placeholder="Password" secureTextEntry />

        {/* Submit Button */}
        <TouchableOpacity onPress={handleEdit} className="bg-red-500 p-5 rounded-lg">
            <Text className="text-white text-center font-semibold">Submit Changes</Text>
        </TouchableOpacity>

    </View>
  )
}