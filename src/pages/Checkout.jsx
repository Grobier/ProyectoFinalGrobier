import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPayment = async () => {
    // Aquí puedes integrar con Mercado Pago
    console.log("Formulario enviado:", formData);
    console.log("Servicios en el carrito:", cart);

    // Lógica para Mercado Pago
    alert("Integrar con Mercado Pago aquí.");
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2 className="text-muted">Tu carrito está vacío</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Confirmar Agendamiento</h1>
      <div className="row">
        {/* Columna de servicios */}
        <div className="col-md-6">
          <h3 className="mb-3">Servicios</h3>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <strong>{item.title}</strong>
                  <span className="text-success fw-bold">${item.price}</span>
                </div>
              </li>
            ))}
            <li className="list-group-item">
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${total.toLocaleString("es-CL")}</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Columna del formulario */}
        <div className="col-md-6">
          <h3 className="mb-3">Detalles del Cliente</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={handleConfirmPayment}
            >
              Confirmar Pago
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
