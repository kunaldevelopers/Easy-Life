import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BusinessDetail from "./pages/BusinessDetail";
import Profile from "./pages/Profile";
import CustomerPanel from "./pages/CustomerPanel";
import SellerPanel from "./pages/SellerPanel";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/business/:id" element={<BusinessDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/customer-panel" element={<CustomerPanel />} />
                <Route path="/seller-panel" element={<SellerPanel />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
