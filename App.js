import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation';
import "./global.css";
import BottomTabs from './src/navigation/BottomTabs';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OnboardScreen from './src/screens/OnboardScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  {/*
  useEffect(() => {
    // To do: use AsyncStorage to track first launch
    setTimeout(() => {
      setIsFirstLaunch(false); // After first launch, navigate to Bottom Tabs
    }, 2000);  // Show Welcome Screen for 2 seconds
  }, []);
  */}

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isFirstLaunch ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Onboard" component={OnboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
        </>
        ) : (
          <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}