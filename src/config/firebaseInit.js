import firebase from "firebase/app";
import "firebase/storage";

import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

export { firebase };