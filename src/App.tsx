import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { OrderPage } from "./pages/OrderPage";
import { SearchPage } from "./pages/SearchPage";
import { CategoryPage } from "./pages/CategoryPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
