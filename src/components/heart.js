import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { db } from '../../FirebaseConfig';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { HeartIcon } from 'react-native-heroicons/solid';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const LikeButton = ({ userId, recipeId }) => {
  const [liked, setLiked] = useState(false);

  // Fetch user's likedRecipes from db set the local state
  useEffect(() => {
    const fetchUserLikes = async () => {
      try {
        const userRef = doc(db, 'Favorites', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            console.log("userDoc exists", userId)
          const likedRecipes = userDoc.data().likedRecipes || [];
          setLiked(likedRecipes.includes(recipeId));
        } else {
            console.log("userDoc doesnt exists")
            // If the user doesn't have a document, we assume they haven't liked any recipes yet
            setLiked(false);
        }
      } catch (error) {
        console.error('Error fetching user likes: ', error);
      }
    };

    fetchUserLikes();
  }, [userId, recipeId]);

  const handleLike = async () => {
    try {
        const userRef = doc(db, 'Favorites', userId);
        const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // If the user document doesn't exist, create it and add the recipeId
        console.log("Creating new doc")
        await setDoc(userRef, {
            likedRecipes: [recipeId], // Initialize likedRecipes array with the current recipeId
          });
        setLiked(true);
        Alert.alert('New like added and user document created!');
      } else {
        if (liked) {
          // Remove the like if already liked
          await updateDoc(userRef, {
            likedRecipes: arrayRemove(recipeId),
          });
          setLiked(false);
          Alert.alert('Like removed!');
        } else {
          // Add the like if not liked
          await updateDoc(userRef, {
            likedRecipes: arrayUnion(recipeId),
          });
          setLiked(true);
          Alert.alert('Recipe liked!');
        }
      }

    } catch (error) {
      console.error('Error updating like: ', error);
      Alert.alert('Error updating like, please try again.');
    }
  };

  return (
    <View>
        <TouchableOpacity onPress={handleLike} className="p-2 rounded-full mr-5 bg-white">
            <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={liked ? "red" : "gray"} />
        </TouchableOpacity>
    </View>
  );
};

export default LikeButton;
