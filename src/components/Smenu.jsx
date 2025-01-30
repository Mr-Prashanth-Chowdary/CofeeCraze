import { Link } from "react-router-dom"


const Smenu = ()=>{
    return(
        <>
        <div className="w-full p-6 absolute bg-black/50 text-white">
            <ul>
               <Link to='/'><li>Home</li></Link> 
               <Link to='/shop'><li>Shop</li></Link> 
                <li>Cart</li>
                <li>Checkout</li>
            </ul>
        </div>
        </>
    )
}
export default Smenu