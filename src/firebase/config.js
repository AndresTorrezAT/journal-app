// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers';

// console.log( import.meta.env ); // frontend env
// console.log(process.env); // backend env
const env = getEnvironments();
console.log(env);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Dev/Prod
// const firebaseConfig = {
//   apiKey: "AIzaSyC77CSmpsxRMDirvNiRINdzWx478vSdABY",
//   authDomain: "react-cursos-d078a.firebaseapp.com",
//   projectId: "react-cursos-d078a",
//   storageBucket: "react-cursos-d078a.appspot.com",
//   messagingSenderId: "247572702009",
//   appId: "1:247572702009:web:a90e56c87aa0b367a3bee8"
// };

// Testing
const firebaseConfig = {
  apiKey: "AIzaSyBGVyAC7ZXeEK-3J1tHCv-Woy037myKIl0",
  authDomain: "react-cursos-test-dae6f.firebaseapp.com",
  projectId: "react-cursos-test-dae6f",
  storageBucket: "react-cursos-test-dae6f.appspot.com",
  messagingSenderId: "182916219370",
  appId: "1:182916219370:web:a6fb4a6da9fb1c43333293"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );