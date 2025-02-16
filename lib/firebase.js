// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyALflwwbJofaqrRqxE36zYgtXzrIvh4yFE",
  authDomain: "hey-sainty.firebaseapp.com",
  projectId: "hey-sainty",
  storageBucket: "hey-sainty.firebasestorage.app",
  messagingSenderId: "39512405076",
  appId: "1:39512405076:web:0f725e431c043e5d0769c1",
  measurementId: "G-94TEZ1QYT6"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and set up the providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export auth and provider to use in other parts of your app
export { auth, googleProvider };