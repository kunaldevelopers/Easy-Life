import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { WebsiteConfigProvider } from "./context/WebsiteConfigContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import ServiceAgreement from "./pages/ServiceAgreement";
import DataPolicy from "./pages/DataPolicy";
import Support from "./pages/Support";
import BusinessDetail from "./pages/BusinessDetail";
import BookService from "./pages/BookService";
import Profile from "./pages/Profile";
import CustomerPanel from "./pages/CustomerPanel";
import SellerPanel from "./pages/SellerPanel";
import AdminPanel from "./pages/AdminPanel";
import Orders from "./pages/Orders";
import SavedBusinesses from "./pages/SavedBusinesses";
import NotFound from "./pages/NotFound";

function AppContent() {
  const location = useLocation();

  // Routes where footer should be hidden (all dashboard panels and related pages)
  const hideFooterRoutes = [
    "/seller-panel",
    "/admin-panel",
    "/customer-panel",
    "/saved-businesses",
    "/orders",
  ];
  const shouldHideFooter =
    hideFooterRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/order/");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<FAQ />} />
          <Route path="/agreement" element={<ServiceAgreement />} />
          <Route path="/terms" element={<ServiceAgreement />} />
          <Route path="/data" element={<DataPolicy />} />
          <Route path="/privacy" element={<DataPolicy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
          <Route path="/book/:id" element={<BookService />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/customer-panel" element={<CustomerPanel />} />
          <Route path="/seller-panel" element={<SellerPanel />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<Orders />} />
          <Route path="/saved-businesses" element={<SavedBusinesses />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <WebsiteConfigProvider>
          <Router>
            <AppContent />
          </Router>
        </WebsiteConfigProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
