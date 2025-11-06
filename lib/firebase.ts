import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDkckYIU56DIM28e3MWVNmsC6pvzO-7Wg",
  authDomain: "threatscan-592cb.firebaseapp.com",
  projectId: "threatscan-592cb",
  storageBucket: "threatscan-592cb.firebasestorage.app",
  messagingSenderId: "537228889915",
  appId: "1:537228889915:web:458a2e48d4d26f40a1311e",
  measurementId: "G-FTQ7LPDGEG"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;


