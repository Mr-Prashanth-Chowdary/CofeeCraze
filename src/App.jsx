import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BuyItemCP from "./contextAPI/BuyItemCP";
import Login from "./components/pages/Login";
import AuthProvider from "./contextAPI/AuthProvider";
import Landingpage from "./components/pages/Landingpage";
import ShopCollection from "./components/pages/ShopCollection";
import CartCollection from "./components/pages/CartCollection";
import Nav from "./components/Nav";
import Foot from "./components/Foot";
import Collection from "./components/pages/Collection";
import PaymentSuccess from "./components/pages/PaymentSuccess";
import Dashboard from "./components/admin/Dashbord";
import AboutUs from "./components/pages/Aboutus";
import Profile from "./components/pages/Profile";
import AdminProfile from "./components/admin/AdminProfile";
import ProtectedRoute from "./components/ProtactedRoute";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <BuyItemCP>
            <Nav />
            <Routes>
              <Route path="/" element={<Landingpage />} />
              <Route path="/s/:id" element={<ShopCollection />} />
              <Route path="/c" element={<CartCollection />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/dashbord" element={<Dashboard />} />
              <Route path="/adminprofile" element={<AdminProfile />} />
              <Route path="/account" element={<Profile />} />
              <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
            </Routes>
          </BuyItemCP>
          <Foot />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
