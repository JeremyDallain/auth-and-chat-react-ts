import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDWp98MTad0T5b0TLIc9Y4oKY6pgIqPkg",
  authDomain: "chat-react-ts-b402c.firebaseapp.com",
  projectId: "chat-react-ts-b402c",
  storageBucket: "chat-react-ts-b402c.appspot.com",
  messagingSenderId: "117392789978",
  appId: "1:117392789978:web:ced76147b857e0d413b0e3",
  measurementId: "G-GEFWWFZG35"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);