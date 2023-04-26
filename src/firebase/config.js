import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1nlf84Scg75QdH2nt6kEp7ytxSMgyxWE",
  authDomain: "rn-app-c51bc.firebaseapp.com",
  projectId: "rn-app-c51bc",
  storageBucket: "rn-app-c51bc.appspot.com",
  messagingSenderId: "655303963366",
  appId: "1:655303963366:web:5924abcf6a40c76d110127",
  measurementId: "G-PFRLDB03DQ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
