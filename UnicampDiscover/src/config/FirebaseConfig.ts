import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCeIIVdgvz7vOcWrlFpLWH9XNw15CZ3Bgg",
    authDomain: "mc426-200cb.firebaseapp.com",
    projectId: "mc426-200cb",
    storageBucket: "mc426-200cb.appspot.com",
    messagingSenderId: "443160614559",
    appId: "1:443160614559:web:136bebf1f32d812aec34aa",
    measurementId: "G-LM41ZSTCTQ"
};

export const firebaseApp = initializeApp(firebaseConfig);
