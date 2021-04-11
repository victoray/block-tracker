import firebase from 'firebase'

import 'firebase/auth'
import { FIREBASE_APP } from './constants/Firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBl10QY9YiNIjbOvghjZJfNDZof_fB3Nrg',
  authDomain: 'block-tracker-9c0b2.firebaseapp.com',
  projectId: 'block-tracker-9c0b2',
  storageBucket: 'block-tracker-9c0b2.appspot.com',
  messagingSenderId: '545142564282',
  appId: '1:545142564282:web:b991cbddd99f645c9f6983',
  measurementId: 'G-2B914Y556J'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig, FIREBASE_APP)
} else {
  firebase.app(FIREBASE_APP)
}
