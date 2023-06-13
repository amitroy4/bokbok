// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuuvmEbtaSZ83mrLvb_bYlep2GEt7ZH7Q",
    authDomain: "bokbok-ce73e.firebaseapp.com",
    projectId: "bokbok-ce73e",
    storageBucket: "bokbok-ce73e.appspot.com",
    messagingSenderId: "159683487501",
    appId: "1:159683487501:web:4fc8d784803161977a7244"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig