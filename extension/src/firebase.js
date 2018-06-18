import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';

firebase.initializeApp({
  apiKey: "AIzaSyDZSv25dY0lsmIbMVm935zfovhDlOEQw3w",
  authDomain: "projectionist-d5fef.firebaseapp.com",
  databaseURL: "https://projectionist-d5fef.firebaseio.com",
  projectId: "projectionist-d5fef",
  storageBucket: "projectionist-d5fef.appspot.com",
  messagingSenderId: "627274624572"
});

export { firebase };
export const firestore = firebase.firestore(), storage = firebase.storage(), auth = firebase.auth(), functions = firebase.functions();
