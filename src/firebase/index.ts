import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAr7tza2iBqHeEVyiDHJKUGiB-LUBFuUcw",
  authDomain: "shoply-hachch1984.firebaseapp.com",
  databaseURL: "https://shoply-hachch1984.firebaseio.com",
  projectId: "shoply-hachch1984",
  storageBucket: "shoply-hachch1984.appspot.com",
  messagingSenderId: "166617088986",
  appId: "1:166617088986:web:0102990e51b1d0f69bf6e3",
});

export const getFirebase = () => {
  return app;
};

export const getFirestore = () => {
  return firebase.firestore(app);
};
