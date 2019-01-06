import firebase from 'firebase/app';
import 'firebase/firebase-storage';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

firebase.initializeApp({
    apiKey: "AIzaSyABcuTFkVlHCMWLaFiUpoABj-_rNGp2Xww",
    authDomain: "todo-c16ad.firebaseapp.com",
    databaseURL: "https://todo-c16ad.firebaseio.com",
    projectId: "todo-c16ad",
    storageBucket: "todo-c16ad.appspot.com",
    messagingSenderId: "481977692543"
});

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});


export default firebase;