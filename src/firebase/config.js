import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAEOiAPlCCqKCgscHnRoRd6xoHzTF0Bhqg",
    authDomain: "the-office-6d60b.firebaseapp.com",
    projectId: "the-office-6d60b",
    storageBucket: "the-office-6d60b.appspot.com",
    messagingSenderId: "455479261810",
    appId: "1:455479261810:web:362f44008f9ce7eed520eb"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const db = firebase.firestore()
const auth = firebase.auth()
const fileStore = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { db, auth, fileStore, timestamp }