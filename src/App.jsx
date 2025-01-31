import Navbar from './components/navbar'
import Body from './components/Body'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Shop from './components/Shop'
import ProductDetails from './components/ProductDetails'
import Checkout from './components/Checkout'


function App() {

  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Body/>}/>
    <Route path='/shop' element={<Shop/>}/>
    <Route path='/product/:productId' element={<ProductDetails/>}/>
    <Route path='/checkout' element={<Checkout/>}/>
    </Routes>
    <Footer/>

    </Router>
    </>
  )
}

export default App
