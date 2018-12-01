import * as firebase from 'firebase';

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