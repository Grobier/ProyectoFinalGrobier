import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import ItemCount from "../components/ItemCount";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Importa las imágenes
import imagenTraining1 from '../assets/t.webp';
import imagenTraining2 from '../assets/p2.avif';
import imagenTraining3 from '../assets/p3.jpg';

const formatCLP = (amount) => {
  return `$${amount.toLocaleString('es-CL')}`;
};

const plans = [
  { id: "2x", label: "2 veces/semana", weeklyRate: 23125, monthly: 185000, quarterly: 527256, yearly: 1998352 },
  { id: "3x", label: "3 veces/semana", weeklyRate: 19710, monthly: 236520, quarterly: 674100, yearly: 2553216 },
  { id: "4x", label: "4 veces/semana", weeklyRate: 17739, monthly: 283824, quarterly: 808896, yearly: 3065280 },
  { id: "5x", label: "5 veces/semana", weeklyRate: 16753, monthly: 335060, quarterly: 954900, yearly: 3618480 },
];

function Training() {
  const { addToCart } = useCart();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
  const [duration, setDuration] = useState("monthly"); // monthly, quarterly, yearly
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesRef = collection(db, "Servicios");
        
        // Obtener documentos que contengan "training" o "entrenamiento" en su ID
        const trainingDocs = await getDocs(servicesRef);
        const servicesData = trainingDocs.docs
          .filter(doc => {
            const id = doc.id.toLowerCase();
            return id.includes('training') || 
                   (doc.data().category && 
                    doc.data().category.toLowerCase() === 'entrenamiento');
          })
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .sort((a, b) => a.title.localeCompare(b.title)); // Ordenar por título

        console.log("Servicios de entrenamiento filtrados:", servicesData);
        setServices(servicesData);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  

  const calculatePrice = () => {
    const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
    if (!selectedPlanData) return 0;

    if (duration === "monthly") return selectedPlanData.monthly;
    if (duration === "quarterly") return selectedPlanData.quarterly;
    if (duration === "yearly") return selectedPlanData.yearly;
    return 0;
  };

  const handleAddToCart = () => {
    if (!selectedService) return;

    const price = calculatePrice();
    addToCart({
      id: `${selectedService.id}-${selectedPlan}-${duration}`,
      title: `${selectedService.title} (${plans.find((p) => p.id === selectedPlan).label} - ${duration})`,
      description: selectedService.description,
      price,
    });
  };

  const getImageForService = (serviceId) => {
    switch (serviceId) {
      case 'training_1_1':
        return imagenTraining1;
      case 'training_1_2':
        return imagenTraining2;
      case 'training_1_3':
        return imagenTraining3;
      default:
        return imagenTraining1; // Imagen por defecto
    }
  };

  if (loading) {
    return <div className="container my-5 text-center">Cargando opciones...</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Entrenamiento</h1>
      <div className="row justify-content-center">
        {services.map((service) => (
          <div key={service.id} className="col-md-4 d-flex align-items-stretch">
            <Card
              className={`shadow-sm mb-4 w-100 ${selectedService?.id === service.id ? "border-primary" : ""}`}
              onClick={() => setSelectedService(service)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img variant="top" src={getImageForService(service.id)} alt={service.title} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{service.title}</Card.Title>
                <Card.Text className="flex-grow-1">{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="mt-5">
          <h3>Selecciona tu plan</h3>
          <div className="mb-3">
            {plans.map((plan) => (
              <Button
                key={plan.id}
                variant={selectedPlan === plan.id ? "primary" : "outline-primary"}
                className="me-2"
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.label}
              </Button>
            ))}
          </div>
          <div className="mb-3">
            <Button
              variant={duration === "monthly" ? "secondary" : "outline-secondary"}
              className="me-2"
              onClick={() => setDuration("monthly")}
            >
              Mensual
            </Button>
            <Button
              variant={duration === "quarterly" ? "secondary" : "outline-secondary"}
              className="me-2"
              onClick={() => setDuration("quarterly")}
            >
              Trimestral
            </Button>
            <Button
              variant={duration === "yearly" ? "secondary" : "outline-secondary"}
              className="me-2"
              onClick={() => setDuration("yearly")}
            >
              Anual
            </Button>
          </div>
          <p className="fw-bold">
            Precio total: {formatCLP(calculatePrice())}
          </p>
          <Button variant="success" onClick={handleAddToCart}>
            Agregar al Carrito
          </Button>
        </div>
      )}
    </div>
  );
}

export default Training;
