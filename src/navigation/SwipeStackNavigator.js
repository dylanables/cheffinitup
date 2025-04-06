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

const SwipeStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Swipe" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Swipe" component={SwipeScreen} />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
        </Stack.Navigator>
    );
};

export default SwipeStackNavigator;