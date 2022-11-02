import firebase from 'firebase';
  
const firebaseConfig = {
    // apiKey: "your api key",
    authDomain: " wwi-dev@appspot.gserviceaccount.com",
    projectId: "wwi-dev",
    storageBucket: "gs://wwi-dev.appspot.com",
    messagingSenderId: "104815324361855266861",
    appId: "wwi-dev"
};
    
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
  
export default storage;