import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Ordenar los servicios alfabéticamente por título
  const sortedCart = [...cart].sort((a, b) => a.title.localeCompare(b.title));

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2 className="text-muted">Tu carrito está vacío</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Tu Carrito</h1>
      <ul className="list-group">
        {sortedCart.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{item.title}</h5>
              <p className="mb-1 text-muted">{item.description}</p>
              <span className="text-success fw-bold">${item.price}</span>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFromCart(item.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-end">
        <button className="btn btn-danger me-3" onClick={clearCart}>
          Vaciar Carrito
        </button>
        <button className="btn btn-success" onClick={() => navigate("/checkout")}>
          Proceder al Pago
        </button>
      </div>
    </div>
  );
}

export default Cart;
