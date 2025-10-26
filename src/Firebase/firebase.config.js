// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKOs9nSuVjChjYQhnbLzQq1T-cOAhDs1c",
  authDomain: "assignment-09-38213.firebaseapp.com",
  projectId: "assignment-09-38213",
  storageBucket: "assignment-09-38213.firebasestorage.app",
  messagingSenderId: "11113627291",
  appId: "1:11113627291:web:cd0dc4dbb4a35df35fd03e",
  measurementId: "G-74W9X29JKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;