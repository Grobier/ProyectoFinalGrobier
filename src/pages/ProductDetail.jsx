import { useParams } from "react-router-dom";

function ProductDetail() {
  let { id } = useParams();
  return <h1>Detalles del producto {id}</h1>;
}

export default ProductDetail;
