import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (service) => {
    setCart((prevCart) => {
      // Verifica si el servicio ya está en el carrito
      const isAlreadyInCart = prevCart.some((item) => item.id === service.id);
      if (isAlreadyInCart) {
        toast.warning("El servicio ya está en el carrito", {
          position: "bottom-right", // Configuración para centrar la alerta
          autoClose: 3000,
        });
        return prevCart; // No agrega duplicados
      }
  
      toast.success("Servicio agregado al carrito", {
        position: "bottom-right", // Configuración para centrar la alerta
        autoClose: 3000,
      });
  
      return [...prevCart, service]; // Agrega el servicio si no está duplicado
    });
  };
  

  // Función para eliminar un servicio del carrito
  const removeFromCart = (serviceId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== serviceId);
      console.log("Carrito actualizado:", updatedCart);
      return updatedCart;
    });
  };
  

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
