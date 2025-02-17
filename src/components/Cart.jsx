import { useContext, useEffect, useState } from "react";
import BuyItemContext from "../contextAPI/BuyItem";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Auth from "../contextAPI/Auth";

const Cart = () => {
  const { setBuyItem } = useContext(BuyItemContext);
  const {isLoggedIn} = useContext(Auth)
  const [errMsg, setErrMsg] = useState(null);
  const [cartData, setCartData] = useState(() => {
    const locData = localStorage.getItem("cart");
    return locData ? JSON.parse(locData) : [];
  });

  useEffect(()=>{
    if(errMsg){
      setTimeout(()=>{
        setErrMsg(null)
      },3000)
    }
  },[errMsg])
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  
    if (isLoggedIn) {
      const saveToDb = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
  
        const headers = {
          headers: { Authorization: `Bearer ${token}` }
        };
  
        try {
          const addTodb = await axios.post("http://localhost:3001/api/cart", cartData, headers);
        } catch (error) {
          console.error("Error saving to DB:", error);
        }
      };
  
      saveToDb();
    }
  }, [cartData, isLoggedIn]);
  

  const handleRemove = (id) => {
    const newData = cartData.filter((item) => item.id !== id);
    setCartData(newData);
  };


  const navgate = useNavigate();


  const handleCheckout = () => {
    if (cartData.length === 0) {
      setErrMsg("No Products to Checkout");
      return;
    }
    setBuyItem(cartData);
    navgate("/checkout");
  };


  return (
    <>
      <div className="bg-black text-white p-6 min-h-[85vh]">
          {errMsg && 
          <div className="flex justify-center text-sm text-red-600">
          <div className="px-5 py-2  rounded-2xl border-2 border-amber-50">
          {errMsg}
          </div>
          </div>}
        <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
        {cartData.map((product) => {
          return (
            <div
              key={product.id}
              className="flex justify-between bg-[#2D2D2D] mb-4"
            >
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
                <button onClick={() => handleRemove(product.id)}>Remove</button>
              </div>
            </div>
          );
        })}
        <div className="flex justify-between mt-4">
          <p className="font-bold">
            Total : ${" "}
            {cartData.reduce((acc, curr) => {
              return acc + curr.price;
            }, 0)}
          </p>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
};
export default Cart;
