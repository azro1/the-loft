import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB7d1zG1uknySU0J2E50S7NWTVZEQ5pinE",
    authDomain: "the-loft-a9e5a.firebaseapp.com",
    projectId: "the-loft-a9e5a",
    storageBucket: "the-loft-a9e5a.appspot.com",
    messagingSenderId: "130326560656",
    appId: "1:130326560656:web:873a22bbfc69132772bd15"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const db = firebase.firestore()
const auth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { db, auth, timestamp }