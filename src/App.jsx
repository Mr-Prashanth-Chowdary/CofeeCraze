import Navbar from './components/navbar'
import Body from './components/Body'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Shop from './components/Shop'
import ProductDetails from './components/ProductDetails'
import Checkout from './components/Checkout'
import Cart from './components/Cart'
import BuyItemCP from './contextAPI/BuyItemCP'


function App() {

  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Body/>}/>
    <Route path='/shop' element={<Shop/>}/>
    <Route path='/product/:productId' element={<BuyItemCP><ProductDetails/></BuyItemCP>}/>
    <Route path='/cart' element={<BuyItemCP><Cart/></BuyItemCP>}/>
    <Route path='/checkout' element={<BuyItemCP><Checkout/></BuyItemCP>}/>
    </Routes>
    <Footer/>

    </Router>
    </>
  )
}

export default App
