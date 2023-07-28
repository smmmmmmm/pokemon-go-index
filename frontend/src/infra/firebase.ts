import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore/lite";

const initializeFirebase = () => {
  const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  });
  const db = getFirestore(app);
  const auth = getAuth(app);
  return { db, auth };
};

const initializeEmulatorFirebase = () => {
  const app = initializeApp({
    projectId: "demo-emulator",
    authDomain: "xxx",
    databaseURL: "xxx",
    appId: "test",
    apiKey: "test",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    measurementId: "xxx",
  });
  const db = getFirestore(app);
  const auth = getAuth(app);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  return { db, auth };
};

const { db, auth } =
  process.env.NEXT_PUBLIC_EMULATOR === "true"
    ? initializeEmulatorFirebase()
    : initializeFirebase();

export const login = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const logout = async () => {
  await signOut(auth);
};

export { db };
