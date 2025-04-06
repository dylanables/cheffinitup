import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const GuestAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  const navigation = useNavigation()

  useEffect(() => {
    // Check if the user has dismissed the alert before
    const checkDismissed = async () => {
      const dismissed = await AsyncStorage.getItem('guestAlertDismissed');
      if (dismissed === 'true') {
        setIsVisible(false);
      }
    };
    checkDismissed();
  }, []);

  const handleDismiss = async () => {
    setIsVisible(false);
    await AsyncStorage.setItem('guestAlertDismissed', 'true'); // Store dismissal state
  };

  if (!isVisible) return null;

  return (
    <View className="bg-yellow-100 p-4 rounded-lg shadow-md border border-yellow-300 mx-4 mt-4">
      <Text className="text-yellow-900 font-semibold">
        You are not signed in. Create an account to save your recipes!
      </Text>
      <View className="flex-row justify-between mt-2">
        <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded" onPress={() => navigation.navigate("Register")}>
          <Text className="text-white">Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDismiss}>
          <Text className="text-gray-500">Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GuestAlert;