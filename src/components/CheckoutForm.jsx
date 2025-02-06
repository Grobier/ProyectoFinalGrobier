import { useState } from "react";
import { useCart } from "../context/CartContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      const order = {
        buyer: { name, email },
        items: cart,
        total,
        date: new Date(),
      };

      // Guardar orden en Firestore
      const docRef = await addDoc(collection(db, "Orders"), order);

      // Guardar ID de la orden y limpiar carrito
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al guardar la orden:", error);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="container my-5 text-center">
        <h2>¡Compra exitosa!</h2>
        <p>Tu ID de orden es: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Finalizar Compra</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Procesando..." : "Confirmar Compra"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
