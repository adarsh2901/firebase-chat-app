import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBqFnCqZxdZCyPkyqPKLzq-OG4XeP-nCoE",
  authDomain: "chat-verse-cae8e.firebaseapp.com",
  projectId: "chat-verse-cae8e",
  storageBucket: "chat-verse-cae8e.appspot.com",
  messagingSenderId: "91214616561",
  appId: "1:91214616561:web:d9c2cee2f7744255dd9650",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
