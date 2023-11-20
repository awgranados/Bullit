import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCnSZT69eC5RfEMrcj1CJJMnbtOb5MVquY",
  authDomain: "carpoolapp-1ddfc.firebaseapp.com",
  projectId: "carpoolapp-1ddfc",
  storageBucket: "carpoolapp-1ddfc.appspot.com",
  messagingSenderId: "661637744975",
  appId: "1:661637744975:web:23e483c9b36d80dc491d3a",
  measurementId: "G-JSWRMV99CP",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export { firestore };
