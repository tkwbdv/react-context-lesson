import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBUrIRMFX9Fg_KlqzYu6VLS71anifrtAHg",
  authDomain: "clothing-store-7252a.firebaseapp.com",
  databaseURL: "https://clothing-store-7252a.firebaseio.com",
  projectId: "clothing-store-7252a",
  storageBucket: "clothing-store-7252a.appspot.com",
  messagingSenderId: "409260899055",
  appId: "1:409260899055:web:956db8723f7642d1"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
