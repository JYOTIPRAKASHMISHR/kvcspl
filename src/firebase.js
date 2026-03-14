import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBig7H_hC39JFmQGEVD7udxMjoSogMIRFA",
  authDomain: "company-3e1e1.firebaseapp.com",
  projectId: "company-3e1e1",
  storageBucket: "company-3e1e1.firebasestorage.app",
  messagingSenderId: "684206772946",
  appId: "1:684206772946:web:772f36eab60e98167a930b",
  measurementId: "G-0GYH2XXSY4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
