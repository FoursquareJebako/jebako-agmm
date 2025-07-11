// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const config = useRuntimeConfig();

const firebaseConfig = {
  apiKey: config.public.apikey,
  authDomain: config.public.authdomain,
  databaseURL: config.public.databaseurl,
  projectId: config.public.projectid,
  storageBucket: config.public.storagebucket,
  messagingSenderId: config.public.messagingsenderid,
  appId: config.public.appid,
  measurementId: config.public.measurementid,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
