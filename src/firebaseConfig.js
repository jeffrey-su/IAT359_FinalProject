// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKbnS7srOw_6NV4oOI8whK-yUMcYRtW4Q",
  authDomain: "iat359finalproject.firebaseapp.com",
  projectId: "iat359finalproject",
  storageBucket: "iat359finalproject.firebasestorage.app",
  messagingSenderId: "958192144581",
  appId: "1:958192144581:web:0fc705552a6fafa916e0ac"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);

export const firebase_auth = getAuth(firebase_app);