import React, { useState } from "react";

function ItemCount({ initial = 1, stock = 10, onAdd }) {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <button
        className="btn btn-outline-primary me-2"
        onClick={handleDecrement}
        disabled={count <= 1}
      >
        -
      </button>
      <span>{count}</span>
      <button
        className="btn btn-outline-primary ms-2"
        onClick={handleIncrement}
        disabled={count >= stock}
      >
        +
      </button>
      <button
        className="btn btn-success ms-3"
        onClick={() => onAdd(count)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ItemCount;
