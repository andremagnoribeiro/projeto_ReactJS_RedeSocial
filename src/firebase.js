import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDbVwOlYkeDREtRsPWU43pd1L09N1WyaGI",
  authDomain: "projeto1-fd330.firebaseapp.com",
  databaseURL: "https://projeto1-fd330.firebaseio.com",
  projectId: "projeto1-fd330",
  storageBucket: "projeto1-fd330.appspot.com",
  messagingSenderId: "878364088379"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const storage = firebase.storage();
