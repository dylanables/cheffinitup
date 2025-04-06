import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardScreen from '../screens/OnboardScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SwipeScreen from '../screens/SwipeScreen';
import TestScreen from '../screens/TestScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

const FavoritesStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Favorites" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
        </Stack.Navigator>
    );
};

export default FavoritesStackNavigator;