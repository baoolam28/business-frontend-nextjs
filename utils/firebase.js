import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDNA1-OUKZanU2bUYKDgzIJSJusCjXxzRI",
  authDomain: "ecommerce-3e776.firebaseapp.com",
  databaseURL:
    "https://ecommerce-3e776-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecommerce-3e776",
  storageBucket: "ecommerce-3e776.appspot.com",
  messagingSenderId: "38070133902",
  appId: "1:38070133902:web:32cb8ad098d45b6dbfd5df",
  measurementId: "G-MX6C9VL2SG",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };