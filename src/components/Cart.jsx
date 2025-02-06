import { useContext, useEffect, useState } from "react";
import BuyItemContext from "../contextAPI/BuyItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {setBuyItem} = useContext(BuyItemContext)
  const [cartData,setCartData] = useState(()=>{
    const locData = localStorage.getItem('cart')
    return locData ? JSON.parse(locData) : []
  })
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cartData))
  },[cartData]);
  const handleRemove = (id)=>{
    const newData = cartData.filter((item)=> item.id !== id)
    setCartData(newData)
  
  }
  const navgate = useNavigate()
  const handleCheckout = ()=>{
    setBuyItem(cartData)
    navgate('/checkout')
  }
  return (
    <>
    <div className="bg-black text-white p-6 min-h-[85vh]">
      <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
      {cartData.map((product)=>{
        return(
        <div key={product.id} className="flex justify-between bg-[#2D2D2D] mb-4">
         <div className="flex items-center p-6">
           <img
             className="w-[100px] h-[100px]"
             src={product.img}
             alt="cart_item_img"
           />
           <div className="ml-4">
             <p>{product.name}</p>
             <p>{product.size}</p>
             <p>${product.price}</p>
           </div>
         </div>
         <div className="flex flex-col justify-center md:flex-row items-center gap-4 mr-4">
            <div className="flex gap-2">
             <button>+</button>
             <p>1</p>
             <button>-</button>
             </div>
             <button onClick={()=>handleRemove(product.id)}>Remove</button>
         </div>
       </div>
      )})}
      <div className="flex justify-between mt-4">
        <p className="font-bold">Total : $ {cartData.reduce((acc,curr)=>{return acc+curr.price},0)}</p>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
    </>
    
  );
};
export default Cart;
