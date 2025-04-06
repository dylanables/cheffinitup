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

const Stack = createNativeStackNavigator();

const ExploreStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
        </Stack.Navigator>
    );
};

export default ExploreStackNavigator;