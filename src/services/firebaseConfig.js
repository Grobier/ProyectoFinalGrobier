import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "fisioterapia-b89af.firebaseapp.com",
  projectId: "fisioterapia-b89af",
  storageBucket: "fisioterapia-b89af.appspot.com",
  messagingSenderId: "479010001599",
  appId: "1:479010001599:web:bafe677723bc1513f96c0a",
  measurementId: "G-DNRDWMLRXR",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configurar Firestore
export const db = getFirestore(app); // Cambiado a exportación nombrada
