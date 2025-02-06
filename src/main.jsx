import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos globales de Bootstrap
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tus propios estilos (opcional)
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CartProvider>
  </React.StrictMode>
);
