import reactNativeImplementation from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import React from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyCPRm98VyQ_x-qoqc2gxXBET8pG3s9RF2k",
    authDomain: "fetanad-1eec5.firebaseapp.com",
    databaseURL: "https://fetanad-1eec5.firebaseio.com",
    projectId: "fetanad-1eec5",
    storageBucket: "fetanad-1eec5.appspot.com",
    messagingSenderId: "621215731325",
    appId: "1:621215731325:web:e4d3d6fcec5e444c85ab14",
    measurementId: "G-Q6W6E9KF0Z"
  };

firebase.initializeApp(firebaseConfig);

export default firebase