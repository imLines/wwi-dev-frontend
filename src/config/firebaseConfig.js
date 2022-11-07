// import firebase from 'firebase';
  
// const before = {
//     // apiKey: "your api key",
//     authDomain: " wwi-dev@appspot.gserviceaccount.com",
//     projectId: "wwi-dev",
//     storageBucket: "gs://wwi-dev.appspot.com",
//     messagingSenderId: "104815324361855266861",
//     appId: "wwi-dev"
// };


// firebase.initializeApp(firebaseConfig);
// var storage = firebase.storage();

// export default storage;


//2


// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "wwi-dev.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://wwi-dev.firebaseio.com",
    projectId: "wwi-dev",
    storageBucket: "wwi-dev.appspot.com",
    messagingSenderId: "no",
    appId: "wwi-dev",
  };


// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
