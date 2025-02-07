import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Rehabilitation from "./pages/Rehabilitation";
import Performance from "./pages/Performance";
import Training from "./pages/Training";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/services/rehabilitation" element={<Rehabilitation />} />
            <Route path="/services/performance" element={<Performance />} />
            <Route path="/services/training" element={<Training />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
