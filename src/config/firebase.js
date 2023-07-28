import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3z7wXTS5oT_xRdnrONR2yOOx0FMQnymw",
  authDomain: "acadbot-407eb.firebaseapp.com",
  projectId: "acadbot-407eb",
  storageBucket: "acadbot-407eb.appspot.com",
  messagingSenderId: "574677625467",
  appId: "1:574677625467:web:864eb242ab3d377b5b90de",
  measurementId: "G-N2SHMTS3BR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
