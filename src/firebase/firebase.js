import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyC2Kew8Fb65cB8HZhZ0XsLxe1NsS5yBix8",
    authDomain: "stage-mobileapp.firebaseapp.com",
    projectId: "stage-mobileapp",
    storageBucket: "stage-mobileapp.appspot.com",
    messagingSenderId: "303185914549",
    appId: "1:303185914549:web:c71bc57594f09520972cfc",
    measurementId: "G-N46232DXRJ"
   
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const deleteProduct = async (id) => { 
    
    await firebase.firestore().collection("produits").doc(id.trim()).delete();
    console.log(id);
    console.log(id.length)
    window.location.reload();
  };
export const db = firebase.firestore();
export const auth = firebase.auth()
export default firebase

