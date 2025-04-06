// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClzV0v5bmSGRAnStpc7wiwS3aff9n9lfY",
  authDomain: "cheffinitup-fd07e.firebaseapp.com",
  projectId: "cheffinitup-fd07e",
  storageBucket: "cheffinitup-fd07e.firebasestorage.app",
  messagingSenderId: "13992361426",
  appId: "1:13992361426:web:ad1ff804d6ccd362729c0b",
  measurementId: "G-3K3Y9S0ND8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
const analytics = getAnalytics(app);