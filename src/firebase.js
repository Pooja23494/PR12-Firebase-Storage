// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxnRk8WPlERVVONj2z4Ml8vQGDtO2FXtw",
  authDomain: "bookstore-8dea2.firebaseapp.com",
  projectId: "bookstore-8dea2",
  storageBucket: "bookstore-8dea2.firebasestorage.app",
  messagingSenderId: "621770200702",
  appId: "1:621770200702:web:768be063d54014f7ecaa2f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
