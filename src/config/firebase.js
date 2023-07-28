import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "acadbot-407eb.firebaseapp.com",
  projectId: process.env.REACT_APP_P_ID,
  storageBucket: "acadbot-407eb.appspot.com",
  messagingSenderId: process.env.REACT_APP_S_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_M_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
