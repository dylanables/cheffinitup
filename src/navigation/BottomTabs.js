import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SwipeScreen from "../screens/SwipeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StackNavigator from "./ExploreStackNavigator";
import SwipeStackNavigator from "./SwipeStackNavigator";
import ExploreStackNavigator from "./ExploreStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import FavoritesStackNavigator from "./FavoritesStackNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          height: 65,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowOpacity: 0.1,
        },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={ExploreStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Swipe"
        component={SwipeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}