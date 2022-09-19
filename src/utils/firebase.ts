// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { User } from "../context/auth.context";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmPJfcXY6GxFm3pohygCnmsWAqu3gt_Z8",
  authDomain: "markdown-react-app.firebaseapp.com",
  projectId: "markdown-react-app",
  storageBucket: "markdown-react-app.appspot.com",
  messagingSenderId: "309908608630",
  appId: "1:309908608630:web:fa31cb72b5ac1c9afeb157",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
export const signInWithGooglePopUp = async (callback: Function) => {
  signInWithPopup(auth, provider)
    .then(({ user }) => {
      callback(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const checkUserAlreadySignedIn = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//get all user from firestore

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  console.log("querySnapshot", querySnapshot);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc);
  });
};

export const createUser = async (data: User) => {
  const refDoc = await doc(db, `users`, data.email);
  const docSnap = await getDoc(refDoc);

  if (docSnap.exists()) {
    console.log("user exist");
    return;
  } else {
    await setDoc(doc(db, "users", data.email), data, {
      merge: false,
    });
  }
};
