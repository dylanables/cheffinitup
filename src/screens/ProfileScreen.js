import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Pressable, SafeAreaView, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {ChevronRightIcon, PencilSquareIcon, ShieldExclamationIcon, NoSymbolIcon, UserGroupIcon, ArrowRightStartOnRectangleIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories'
import Recipes from '../components/recipes'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/navbar'
import { getAuth, onAuthStateChanged, deleteUser} from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "../navigation/BottomTabs";
import GuestAlert from '../components/guestAlert'

export default function ProfileScreen() {

    const [user, setUser] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(true)
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [userPhotoURL, setUserPhotoURL] = useState(null);
    const navigation = useNavigation();

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

    const handleSignOut = async () => {
        auth.signOut()
            .then(() => {
                navigation.navigate("Onboard");
            })
            .catch ((error) => {
                console.log(error);
                alert("Logout failed: " + error.message);
            });
    }

    const handleDeleteUser = async () => {
        Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? All of your saved recipes will be erased.',
        [
            {
            text: 'Cancel',
            onPress: () => console.log('Account not deleted'),
            style: 'cancel',
            },
            {
            text: 'Yes',
            onPress: () => {
                deleteUser(user).then(() => {
                    navigation.navigate("Onboard");
                    console.log('Account deleted')
                }).catch((error) => {
                console.log(error);
                    alert("Failed to delete account: " + error.message);
                });
            },
            style: 'destructive',
            },
        ],
        { cancelable: true } // Dismiss by tapping outside
        );
    }

    const defaultPfp = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106";

  return (
    <SafeAreaView className="flex-1">
        <StatusBar style='dark' />
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}
            className="space-y-6 pt-14"
        >

            {!isAnonymous &&
            <View className="items-center mb-6">
                {/* User's Photo */}
                <Image
                source={{ uri: defaultPfp }} // You can replace with a dynamic image URL or local asset
                className="w-32 h-32 rounded-full mb-2"
                />
                {/* User's Name and Email */}
                <Text className="text-2xl font-semibold text-gray-800">{user?.displayName}</Text>
                <Text className="text-sm text-gray-600">{user?.email}</Text>
            </View>
            }

            {/* Disclaimer if anonymous */
                isAnonymous &&
                <GuestAlert />
            }

            {/* Buttons */}
            <View className="space-y-4">
                {/* Edit Profile Button */
                !isAnonymous &&
                <TouchableOpacity
                className="bg-white rounded-lg mx-2 mt-3 p-6 flex-row justify-between"
                onPress={()=>navigation.navigate("EditProfile")}
                >
                    <View className="flex-row">
                        <PencilSquareIcon />
                        <Text className="text-lg ml-3">Edit Profile</Text>
                    </View>
                    <ChevronRightIcon />
                </TouchableOpacity>
                }

                {/* Create Account Button (if anonymous) */
                isAnonymous &&
                <TouchableOpacity
                className="bg-white rounded-lg mx-2 mt-3 p-6 flex-row justify-between"
                onPress={()=>navigation.navigate("Register")}
                >
                    <View className="flex-row">
                        <PencilSquareIcon color="black" />
                        <Text className="text-lg ml-3">Create Account/Sign In</Text>
                    </View>
                    <ChevronRightIcon />
                </TouchableOpacity>
                }

                {/* Set Dietary Restrictions Button */}
                <TouchableOpacity
                className="bg-white rounded-lg mx-2 mt-3 p-6 flex-row justify-between"
                onPress={()=>{}}
                >
                    <View className="flex-row">
                        <ShieldExclamationIcon color="black" />
                        <Text className="text-lg ml-3">Set Dietary Restrictions</Text>
                    </View>
                    <ChevronRightIcon />
                </TouchableOpacity>

                {/* Invite Friends Button */}
                <TouchableOpacity
                className="bg-white rounded-lg mx-2 mt-3 p-6 flex-row justify-between"
                onPress={()=>{}}
                >
                    <View className="flex-row">
                        <UserGroupIcon color="black" />
                        <Text className="text-lg ml-3">Invite Friends</Text>
                    </View>
                    <ChevronRightIcon />
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity
                className="bg-white rounded-lg mx-2 mt-3 p-6 flex-row"
                onPress={handleSignOut}
                >
                    <ArrowRightStartOnRectangleIcon color="#ef4444" />
                    <Text className="text-lg ml-3 text-red-500">Logout</Text>
                </TouchableOpacity>
                
            </View>

            {!isAnonymous &&
            <View className="p-10 w-full">
                <TouchableOpacity onPress={handleDeleteUser}>
                    <Text className="text-center font-medium text-red-500">Delete Account</Text>
                </TouchableOpacity>
            </View>
            }
            
            
        </ScrollView>
    </SafeAreaView>
  )
}