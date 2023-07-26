import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore/lite";

const app = initializeApp({
  projectId: 'emulator',
  appId: 'test',
  apiKey: 'test',
});
const db = getFirestore(app);
const auth = getAuth(app);

if (process.env.NEXT_PUBLIC_EMULATOR === "true") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export const login = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const logout = async () => {
  await signOut(auth);
};

export { db };
