// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC00vdY1ePvGb6eIq3GYTn9sZgHQm0lqGc",
  authDomain: "ddoskitchen.firebaseapp.com",
  projectId: "ddoskitchen",
  storageBucket: "ddoskitchen.appspot.com",
  messagingSenderId: "57929834946",
  appId: "1:57929834946:web:3975dcb77bbe7bb1d5765b",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✅ Fix: Export app also
export { app, auth, provider, db };