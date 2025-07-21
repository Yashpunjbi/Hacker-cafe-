// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore import
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

// ✅ Initialize Firestore
const db = getFirestore(app);

export { db }; // ✅ Export this so Checkout.jsx can use it