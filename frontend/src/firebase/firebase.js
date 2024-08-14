// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "authdomain",
  projectId: "projectid",
  storageBucket: "storagebucket url",
  messagingSenderId: "messaging Sender Id",
  appId: "app:id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app)
const storage = getStorage(app)

export { app, auth, storage };