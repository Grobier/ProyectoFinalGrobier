import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

// Importa la imagen
import imagenEvaluacion from '../assets/rendimiento.jpg';

function Performance() {
  const { addToCart } = useCart();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const servicesRef = collection(db, "Servicios");
        const q = query(servicesRef, where("category", "==", "Rendimiento Deportivo"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const serviceData = querySnapshot.docs[0].data();
          setService({ id: querySnapshot.docs[0].id, ...serviceData });
        }
      } catch (error) {
        console.error("Error al obtener el servicio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, []);

  if (loading) {
    return <div className="container my-5 text-center">Cargando servicio...</div>;
  }

  if (!service) {
    return <div className="container my-5 text-center">Servicio no disponible.</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">{service.title}</h1>
      <div className="card shadow-sm">
        <img src={imagenEvaluacion} className="card-img-top" alt="Evaluación para la mejora del rendimiento" />
        <div className="card-body">
          <p className="card-text">{service.description}</p>
          <p className="text-success fw-bold">Precio: ${service.price}</p>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(service)}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Performance;
