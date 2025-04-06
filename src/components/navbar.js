import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {ArrowRightEndOnRectangleIcon, ArrowsRightLeftIcon, HomeIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <StyledView className="flex-1 justify-center items-center bg-white">
    <StyledText className="text-lg font-semibold">Home Screen</StyledText>
  </StyledView>
);

const SearchScreen = () => (
  <StyledView className="flex-1 justify-center items-center bg-white">
    <StyledText className="text-lg font-semibold">Search Screen</StyledText>
  </StyledView>
);

const FavoritesScreen = () => (
  <StyledView className="flex-1 justify-center items-center bg-white">
    <StyledText className="text-lg font-semibold">Favorites Screen</StyledText>
  </StyledView>
);

const ProfileScreen = () => (
  <StyledView className="flex-1 justify-center items-center bg-white">
    <StyledText className="text-lg font-semibold">Profile Screen</StyledText>
  </StyledView>
);


export default function Navbar({screen}) {
    const navigation = useNavigation();
  return (
    <View className="mx-4 flex-row justify-between items-center mb-2">
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
            <HomeIcon size={hp(4)} color="gray" />
        </TouchableOpacity>

        <Text>Cheffin It Up</Text>

        {screen && (screen == "Home" ?
        <TouchableOpacity onPress={()=>navigation.navigate("Swipe")}>
            <ArrowsRightLeftIcon size={hp(4)} color="gray" />
        </TouchableOpacity> :
        <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
            <ArrowRightEndOnRectangleIcon size={hp(4)} color="gray" />
        </TouchableOpacity>
        )
        }
    </View>
  )
}