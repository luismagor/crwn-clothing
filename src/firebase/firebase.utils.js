import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAAVU3VTGyusGXrvc3PJnqEpsWg9avJNPM',
  authDomain: 'crwn-db-10e0c.firebaseapp.com',
  databaseURL: 'https://crwn-db-10e0c.firebaseio.com',
  projectId: 'crwn-db-10e0c',
  storageBucket: 'crwn-db-10e0c.appspot.com',
  messagingSenderId: '681700174948',
  appId: '1:681700174948:web:8111e04d5b28d799f24371',
  measurementId: 'G-6Z4VNH30E7',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

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
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
