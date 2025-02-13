import { useNavigate, useParams } from "react-router-dom";
import { data } from "./config/staticData";
import { useContext, useState } from "react";
import BuyItemContext from "../contextAPI/BuyItem";
import Auth from "../contextAPI/Auth";


const ProductDetails = () => {
  const [quantity,setQuantity] = useState(1);
  const [cartData, setCartData] = useState(() => {
    const loclData = localStorage.getItem("cart");
    return loclData ? JSON.parse(loclData) : [];
  });
  const navgate = useNavigate()
  const {buyItem,setBuyItem} = useContext(BuyItemContext)
  const {isLoggedIn} = useContext(Auth)
  console.log(buyItem)
  const { productId } = useParams();
  const product = data.Featured.find(
    (coffee_obj) => coffee_obj.id.toString() === productId
  );
  const isCartItem = cartData.some((item) => item.id.toString() === productId);

  const handleAddtoCart = (id,img,name,size,price)=>{
    const item = {id:id,img:img,name:name,size:size,price:price,quantity:quantity}
    setCartData((prev)=>[...prev,item])
  }

  const handleBuynow = (id,img,name,size,price,quantity)=>{
    console.log(isLoggedIn)
    if(!isLoggedIn){
      navgate('/login')
      return
    }
    const item = {id:id,img:img,name:name,size:size,price:price,quantity:quantity}
    setBuyItem([item])
    navgate('/checkout')
  }
  const handleQuantity = (e)=>{
    const value = e.target.value;
    value > 0 ? setQuantity(e.target.value) : setQuantity(1);
  }
  return (
    <>
      <div className="bg-black text-white min-h-screen p-6 flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-[65%]">
          <div
            className="w-full h-[400px] bg-center bg-cover"
            style={{ backgroundImage: `url(${product.img})` }}
          ></div>
          <p>{product.name}</p>
          <p>{product.about}</p>
          <p>${product.price}</p>
          <label htmlFor="quantity">Quantity </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantity}
            className="border-2 rounded-2xl pl-5 border-white"
          />
          <br />
          {isCartItem ? (
            <button className="text-center w-full text-lg" onClick={()=>handleBuynow(product.id,product.img,product.name,product.size, product.price)}>Buy Now</button>
          ) : (
            <button className="text-center w-full text-lg" onClick={()=>handleAddtoCart(product.id,product.img,product.name,product.size, product.price)}>Add to Cart</button>
          )}
        </div>
        <div className="w-full md:w-[32%]">
          <h1 className="font-bold text-xl mb-2">Related Products</h1>
          <div className="flex gap-2 bg-[#2D2D2D] p-5">
            <img
              className="w-[50px] h-[50px]"
              src={data.Featured[0].img}
              alt=""
            />
            <div>
              <p>{data.Featured[0].name}</p>
              <p>{data.Featured[0].price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
