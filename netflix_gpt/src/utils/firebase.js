// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBIGAXzo-CnBRHODEEzp4hne3MtGIlyT8o',
  authDomain: 'netflix-gpt-7dfdc.firebaseapp.com',
  projectId: 'netflix-gpt-7dfdc',
  storageBucket: 'netflix-gpt-7dfdc.appspot.com',
  messagingSenderId: '448191641635',
  appId: '1:448191641635:web:af320e476d77c6e2889996',
  measurementId: 'G-0N6RH0K19Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
