import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "mern-estate-d75e4.firebaseapp.com",
  projectId: "mern-estate-d75e4",
  storageBucket: "mern-estate-d75e4.appspot.com",
  messagingSenderId: "815554770840",
  appId: "1:815554770840:web:184dfebe8fc622d50b5ded"
};

export const app = initializeApp(firebaseConfig);
