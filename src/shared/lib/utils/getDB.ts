import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmre4iPJchjVq7c4iAZKy0M98jpNzkKWE',
  authDomain: 'users-d528f.firebaseapp.com',
  projectId: 'users-d528f',
  storageBucket: 'users-d528f.appspot.com',
  messagingSenderId: '327344601962',
  appId: '1:327344601962:web:855c9bc1bf8760dd79c313',
};

export const app = initializeApp(firebaseConfig);

const getDB = () => {
  return getFirestore(app);
};

export default getDB;
