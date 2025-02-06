import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

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
      <div className="row">
        {cart.map((item) => (
          <div key={item.id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted">{item.description}</p>
                <p className="text-success fw-bold">${item.price}</p>
                <div className="text-end">
                  <button
                    className="btn btn-danger btn-sm mt-3"
                    style={{ fontSize: "12px", width: "80px" }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-end">
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
