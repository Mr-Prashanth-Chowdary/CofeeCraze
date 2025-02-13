import Navbar from './components/Navbar'
import Body from './components/Body'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Shop from './components/Shop'
import ProductDetails from './components/ProductDetails'
import Checkout from './components/Checkout'
import Cart from './components/Cart'
import BuyItemCP from './contextAPI/BuyItemCP'
import Login from './components/pages/Login'
import AuthProvider from './contextAPI/AuthProvider'

function App() {

  return (
    <>
    <Router>
    <AuthProvider>
    <Navbar/>
    <BuyItemCP>
    <Routes>
    <Route path='/' element={<Body/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/shop' element={<Shop/>}/>
    <Route path='/product/:productId' element={<ProductDetails/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/checkout' element={<Checkout/>}/>
    </Routes>
    </BuyItemCP>
    <Footer/>
    </AuthProvider>
    </Router>
    </>
  )
}

export default App
