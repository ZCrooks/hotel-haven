// FIREBASE SETUP

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeBuQzGg4w8psOwz9sVZGJ6QWxqmce8H0",
  authDomain: "hotel-haven-7948b.firebaseapp.com",
  projectId: "hotel-haven-7948b",
  storageBucket: "hotel-haven-7948b.appspot.com",
  messagingSenderId: "567197279559",
  appId: "1:567197279559:web:ab93b56f95fdfec4771862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore Database
const db = getFirestore(app);

export { db};