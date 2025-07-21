// Import only what you use (tree-shakable)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 🔥 Firestore
import { getAuth } from "firebase/auth"; // 🔐 Auth (optional)

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC00vdY1ePvGb6eIq3GYTn9sZgHQm0lqGc",
  authDomain: "ddoskitchen.firebaseapp.com",
  projectId: "ddoskitchen",
  storageBucket: "ddoskitchen.firebasestorage.app",
  messagingSenderId: "57929834946",
  appId: "1:57929834946:web:3975dcb77bbe7bb1d5765b",
  measurementId: "G-V49H346Q22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth (export to use in components)
export const db = getFirestore(app);
export const auth = getAuth(app);