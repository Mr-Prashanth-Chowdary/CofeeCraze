import { useState } from "react"
import Smenu from "./Smenu"
import { Link } from "react-router-dom"


const Navbar = () =>{
    const [isMenu,setIsMenu] = useState(false)
    {console.log(isMenu)
    return(
        <>
        <div className="flex w-full justify-between h-14 items-center bg-[#2D2D2D] text-white px-4">
            <div>
            <img className="h-10 w-10 inline-block mr-3 rounded-[50%]" src="https://www.shutterstock.com/image-vector/coffee-cup-icon-tea-logo-600nw-2478306581.jpg" id="logo" alt="logo" />
            <label className="inline-block" htmlFor="logo">CoffeeCraze</label>
            </div>
            <div className="md:hidden">
               <button onClick={()=>{setIsMenu(!isMenu)}}>menu</button>
            </div>
            <ul className="hidden md:flex gap-3">
               <Link to='/'> <li>Home</li></Link>
               <Link to='/shop'><li>Shop</li></Link>
               <li>Cart</li>
               <Link to='/checkout'><li>Checkout</li></Link> 
            </ul>
        </div>
        {
            isMenu ? <Smenu/> :""
        }
        </>
    )
}
}
export default Navbar