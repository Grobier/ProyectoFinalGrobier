import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

// Importa las imágenes
import imagenEvaluacion from '../assets/e.jpeg';
import imagenSesiones from '../assets/s.jpeg';

function Rehabilitation() {
  const { addToCart } = useCart();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState(1);

  // Obtener servicios desde Firebase
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesRef = collection(db, "Servicios");
        const q = query(servicesRef, where("category", "==", "Rehabilitación"));
        const querySnapshot = await getDocs(q);

        const servicesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Servicios obtenidos:", servicesData);
        setServices(servicesData);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleAddToCart = (service) => {
    addToCart({
      id: service.id === "sessions" ? `sessions-${sessions}` : service.id,
      title:
        service.id === "sessions"
          ? `${service.title} (${sessions} sesión(es))`
          : service.title,
      description: service.description,
      price: service.id === "sessions" ? sessions * service.price : service.price,
    });
  };

  if (loading) {
    return <div className="container my-5 text-center">Cargando servicios...</div>;
  }

  if (services.length === 0) {
    return <div className="container my-5 text-center">No hay servicios disponibles.</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Rehabilitación</h1>
      <div className="row justify-content-center">
        {services.map((service) => (
          <div key={service.id} className="col-md-6 col-lg-4 d-flex align-items-stretch">
            <div className="card shadow-sm mb-4 w-100">
              <img
                src={service.id === "evaluation" ? imagenEvaluacion : imagenSesiones}
                className="card-img-top"
                alt={service.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text flex-grow-1">{service.description}</p>
                <p className="text-success fw-bold">
                  Precio: ${service.id === "sessions" ? `${service.price} por sesión` : service.price}
                </p>

                {service.id === "sessions" && (
                  <div className="d-flex align-items-center mb-3">
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={() => setSessions(Math.max(1, sessions - 1))}
                    >
                      -
                    </button>
                    <span>{sessions} sesión(es)</span>
                    <button
                      className="btn btn-outline-primary ms-2"
                      onClick={() => setSessions(sessions + 1)}
                    >
                      +
                    </button>
                  </div>
                )}

                <button
                  className="btn btn-success mt-auto"
                  onClick={() => handleAddToCart(service)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rehabilitation;
