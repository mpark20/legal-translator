// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQI9MS70bqAToFMRe7Ah63JgIiHrFqlSk",
  authDomain: "legal-ease-91907.firebaseapp.com",
  projectId: "legal-ease-91907",
  storageBucket: "legal-ease-91907.appspot.com",
  messagingSenderId: "689121591455",
  appId: "1:689121591455:web:3b9c6863e4c2a3ae9222aa",
  measurementId: "G-NBBX6DQVVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);