
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth"
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyCeQx2fY7EwF8Q0aA-HGSB-7D7iGHXMyDU",
  authDomain: "univers-e9307.firebaseapp.com",
  projectId: "univers-e9307",
  storageBucket: "univers-e9307.appspot.com",
  messagingSenderId: "927627267851",
  appId: "1:927627267851:web:83230f71cfdf261f495c0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// const auth = getAuth(app);
// setPersistence(auth, browserLocalPersistence);

const db = getFirestore();

export {auth, db};