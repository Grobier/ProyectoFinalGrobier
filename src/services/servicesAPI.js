import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function getServices() {
  const servicesCollection = collection(db, "Servicios"); // Nombre de la colección
  const snapshot = await getDocs(servicesCollection);
  const services = snapshot.docs.map((doc) => ({
    id: doc.id, // Incluye el ID único generado por Firestore
    ...doc.data(), // Agrega los datos del documento
  }));
  console.log("Servicios obtenidos desde Firebase:", services); // Verificar los datos
  return services;
}
