// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpTzyjfjoiIMTqgq1A8_e6QrFngVQlDSA",
  authDomain: "edudev-ff298.firebaseapp.com",
  projectId: "edudev-ff298",
  storageBucket: "edudev-ff298.appspot.com",
  messagingSenderId: "549942488503",
  appId: "1:549942488503:web:8fd8cedb9b78c0fe654c32",
  measurementId: "G-8NSN9MG12V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);