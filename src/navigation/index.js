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

function AppNavigation() {
    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Onboard" component={OnboardScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
            <Stack.Screen name="Swipe" component={SwipeScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
        </Stack.Navigator>
    )
}

export default AppNavigation;