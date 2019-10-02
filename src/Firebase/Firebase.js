import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
  // apiKey: 'AIzaSyCyqN9-cz8ThVwUzKE7YPkG1FsJogujuGE',
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: 'todo-auth-thanhvo-b181a.firebaseapp.com',
  databaseURL: 'https://todo-auth-thanhvo-b181a.firebaseio.com',
  projectId: 'todo-auth-thanhvo-b181a',
  storageBucket: 'todo-auth-thanhvo-b181a.appspot.com',
  messagingSenderId: '419649844800',
  appId: '1:419649844800:web:41a33ccb63462790ef91a5',
  measurementId: 'G-TJG4EE376K',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
