import { getCart } from "./config/staticData";

const Cart = () => {
    const cartData = getCart()
    const handleRemove =(id)=>{
    }
  return (
    <>
    <div className="bg-black text-white p-6 min-h-[85vh]">
      <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
      {cartData.map((item)=>{
        return(
        <div key={item.id} className="flex justify-between bg-[#2D2D2D] mb-4">
        {console.log(item)}
         <div className="flex items-center p-6">
           <img
             className="w-[100px] h-[100px]"
             src={item.img}
             alt="cart_item_img"
           />
           <div className="ml-4">
             <p>{item.name}</p>
             <p>{item.size}</p>
             <p>${item.price}</p>
           </div>
         </div>
         <div className="flex flex-col justify-center md:flex-row items-center gap-4 mr-4">
            <div className="flex gap-2">
             <button>+</button>
             <p>1</p>
             <button>-</button>
             </div>
             <button>Remove</button>
         </div>
       </div>
      )})}
      <div className="flex justify-between mt-4">
        <p className="font-bold">Total : $ {cartData.reduce((acc,curr)=>{return acc+curr.price},0)}</p>
        <button>Proceed to Checkout</button>
      </div>
    </div>
    </>
    
  );
};
export default Cart;
