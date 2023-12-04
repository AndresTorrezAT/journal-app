// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC77CSmpsxRMDirvNiRINdzWx478vSdABY",
  authDomain: "react-cursos-d078a.firebaseapp.com",
  projectId: "react-cursos-d078a",
  storageBucket: "react-cursos-d078a.appspot.com",
  messagingSenderId: "247572702009",
  appId: "1:247572702009:web:a90e56c87aa0b367a3bee8"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );