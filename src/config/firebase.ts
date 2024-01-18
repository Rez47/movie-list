import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSsnVAXIJ9ikMO7nJkOijHUtY8iX2na38",
  authDomain: "medialist-6c8f8.firebaseapp.com",
  projectId: "medialist-6c8f8",
  storageBucket: "medialist-6c8f8.appspot.com",
  messagingSenderId: "259935054603",
  appId: "1:259935054603:web:36ad0583c5a7affbc2100e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export default app;
export { db };
