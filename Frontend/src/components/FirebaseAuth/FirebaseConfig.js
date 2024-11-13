// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: "AIzaSyAF0x9hbeYgNeXh4H7D9_rQcjnhKTMYswY",
    authDomain: "hey-sainty.firebaseapp.com",
    projectId: "hey-sainty",
    storageBucket: "hey-sainty.firebasestorage.app",
    messagingSenderId: "39512405076",
    appId: "1:39512405076:web:9def0a8d23edc9a90769c1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and set up the providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export auth and provider to use in other parts of your app
export { auth, googleProvider };
