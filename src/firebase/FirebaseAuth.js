// firebase/FirebaseAuth.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC00vdY1ePvGb6eIq3GYTn9sZgHQm0lqGc",
  authDomain: "ddoskitchen.firebaseapp.com",
  projectId: "ddoskitchen",
  storageBucket: "ddoskitchen.firebasestorage.app",
  messagingSenderId: "57929834946",
  appId: "1:57929834946:web:3975dcb77bbe7bb1d5765b",
  measurementId: "G-V49H346Q22"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  provider,
  signInWithPopup
};