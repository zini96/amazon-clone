import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3DnBkr84jVZSUP8zj0nQHco1EbgyfyVQ",
  authDomain: "clone-81b9a.firebaseapp.com",
  projectId: "clone-81b9a",
  storageBucket: "clone-81b9a.appspot.com",
  messagingSenderId: "222960259688",
  appId: "1:222960259688:web:6bdeb0487f835e9621a1dd",
  measurementId: "G-MQKEYX8H1S",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
