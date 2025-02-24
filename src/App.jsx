import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './components/Shop';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import BuyItemCP from './contextAPI/BuyItemCP';
import Login from './components/pages/Login';
import AuthProvider from './contextAPI/AuthProvider';
// import Profile from './components/profile/profile';
import ProtectedRoute from './components/ProtactedRoute'; // Import the ProtectedRoute component
import Landingpage from './components/pages/Landingpage';
import ShopCollection from './components/pages/ShopCollection';
import CartCollection from './components/pages/CartCollection';
import Nav from './components/Nav'
import Foot from "./components/Foot";
import Collection from './components/pages/collection';
import PaymentSuccess from './components/pages/PaymentSuccess'
import Dashboard from './components/admin/Dashbord';
import AboutUs from './components/pages/Aboutus';
import Profile from './components/pages/Profile';
import AdminProfile from './components/admin/AdminProfile';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <BuyItemCP>
            {/* <Navbar /> */}
            <Nav/>
            <Routes>
            <Route path="/" element={<Landingpage/>}/>
            <Route path='/s/:id' element={<ShopCollection/>}/>
            <Route path='/c' element={<CartCollection/>}/>
            <Route path='/collection' element={<Collection/>}/>
            <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/dashbord' element={<Dashboard/>}/>
            <Route path='/adminprofile' element={<AdminProfile/>}/>
            <Route path='/account' element={<Profile/>}/>
              {/* <Route path="/home" element={<Body />} />
              <Route path="/shop" element={<Shop />} /> */}
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />

              {/* Protected routes
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} /> */}
            </Routes>
          </BuyItemCP>
          {/* <Footer /> */}
          <Foot/> 
          
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
