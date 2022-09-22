// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  serverTimestamp,
  orderBy,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { User } from "../context/auth.context";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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

//after signin success, create user in firestore
export const createUser = async (data: User) => {
  const refDoc = await doc(db, `users`, data.email);
  const docSnap = await getDoc(refDoc);

  if (docSnap.exists()) {
    return;
  } else {
    await setDoc(doc(db, "users", data.email), data, {
      merge: false,
    });
  }
};

//sign out
export const signOutGoogle = (callback: Function) => {
  signOut(auth)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addNote = async (note: string, email: string) => {
  const docRef = await addDoc(collection(db, "notes", email, "noteList"), {
    note,
    createAt: serverTimestamp(),
  });
};

export const getAllNotes = async (email: string): Promise<any> => {
  if (!email) return null;
  let listNotes: any[] = [];

  const q = query(
    collection(db, "notes", email, "noteList"),
    orderBy("createAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const objNote = {
      id: doc.id,
      createdAt: doc.data().createAt.toDate().toDateString(),
      content: doc.data().note,
    };
    listNotes.push(objNote);
  });

  return listNotes;
};

export const deleteNote = async (email: string, id: string) => {
  try {
    await deleteDoc(doc(db, "notes", email, "noteList", id));
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = async (
  email: string,
  id: string,
  content: string
) => {
  try {
    const noteRef = doc(db, "notes", email, "noteList", id);
    await updateDoc(noteRef, {
      note: content,
    });
  } catch (error) {
    console.log(error);
  }
};
