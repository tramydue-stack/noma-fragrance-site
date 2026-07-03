/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import CollectionPage from './pages/CollectionPage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ScentAdvisoryPage from './pages/ScentAdvisoryPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PolicyPage from './pages/PolicyPage';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="collection" element={<CollectionPage />} />
            <Route path="products" element={<ProductListingPage />} />
            <Route path="products/:slug" element={<ProductDetailPage />} />
            <Route path="advisory" element={<ScentAdvisoryPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="policies" element={<PolicyPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}
