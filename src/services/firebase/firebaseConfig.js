// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgJA2f4Iab2Cf-RP0wxpaJhU87AlGhWfE",
    authDomain: "clc-ecommerce.firebaseapp.com",
    projectId: "clc-ecommerce",
    storageBucket: "clc-ecommerce.appspot.com",
    messagingSenderId: "688032042120",
    appId: "1:688032042120:web:1e725e5969ffe71ce2a33d",
    measurementId: "G-XETPR9B2K2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app);