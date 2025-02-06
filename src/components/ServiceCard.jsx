import React from 'react';
import { useCart } from '../context/CartContext';

const ServiceCard = ({ id, title, description, price }) => {
  const { addToCart, removeFromCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, title, description, price });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <img
        src={`https://via.placeholder.com/350x150?text=${encodeURIComponent(title)}`}
        className="card-img-top"
        alt={title}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="text-success fw-bold">${price}</span>
          <button className="btn btn-danger btn-sm" onClick={handleRemoveFromCart}>
            Eliminar
          </button>
        </div>
        <button className="btn btn-primary btn-sm mt-2" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
