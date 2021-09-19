// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAyU3aExIZSvDzth0yLLgK9aKqSWzX2gr0",

  authDomain: "hamza-15b1b.firebaseapp.com",

  projectId: "hamza-15b1b",

  storageBucket: "hamza-15b1b.appspot.com",

  messagingSenderId: "1000461037202",

  appId: "1:1000461037202:web:7918ba3874f92b961ac04b"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export {db};
export {app};