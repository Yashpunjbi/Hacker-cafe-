// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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