import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

function Checkout() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>Tu carrito está vacío</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Confirmar Agendamiento</h1>
      <div className="row">
        {cart.map((item) => (
          <div key={item.id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted">{item.description}</p>
                <span className="text-success fw-bold">${item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="fw-bold text-end">
        Total: ${cart.reduce((acc, item) => acc + item.price, 0)}
      </p>
      {/* Integración del formulario de checkout */}
      <CheckoutForm />
    </div>
  );
}

export default Checkout;
