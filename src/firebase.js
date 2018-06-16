import React from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';

const signInUiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

firebase.initializeApp({
  apiKey: "AIzaSyDZSv25dY0lsmIbMVm935zfovhDlOEQw3w",
  authDomain: "projectionist-d5fef.firebaseapp.com",
  databaseURL: "https://projectionist-d5fef.firebaseio.com",
  projectId: "projectionist-d5fef",
  storageBucket: "projectionist-d5fef.appspot.com",
  messagingSenderId: "627274624572"
});

const Auth = props => <FirebaseAuth uiConfig={signInUiConfig} firebaseAuth={firebase.auth()} {...props} />;

export { firebase, Auth };
export const firestore = firebase.firestore, storage = firebase.storage;
