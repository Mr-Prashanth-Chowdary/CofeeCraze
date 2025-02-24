import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CartShimmer from '../shimmerUI/CartShimmer';
import baseURL from '../config/baseURL';
import Paynow from '../Paynow';

export default function CartCollection() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState('0.00');
  const navigate = useNavigate();

  // Function to fetch the cart data from the backend
  const fetchCartData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseURL}/api/cart/cartitems`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Map the fetched data into the format required by the UI
      const mappedCartItems = response.data.cartItems.map(item => ({
        id: item._id,
        img: item.image1,
        name: item.itemName,
        price: item.price,
        quantity: 1
      }));
      setCartItems(mappedCartItems);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Recalculate total when cartItems changes
  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(totalPrice.toFixed(2));
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    // Optionally, add API call here to update quantity on the backend
  };

  const handleRemoveItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${baseURL}/api/cart/remove/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Re-fetch the cart data after successful removal
      fetchCartData();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <CartShimmer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Cart</h1>
        <p className="text-xl text-gray-600 mb-6">
          No items added to cart. Would you like to browse now?
        </p>
        <button 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/collection')}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Cart</h1>
      
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <th className="text-left py-4 px-2 sm:px-4 min-w-[150px]">Product</th>
              <th className="text-left py-4 px-2 sm:px-4 min-w-[80px]">Price</th>
              <th className="text-left py-4 px-2 sm:px-4 min-w-[80px]">Quantity</th>
              <th className="text-left py-4 px-2 sm:px-4 min-w-[80px]">Total</th>
              <th className="text-left py-4 px-2 sm:px-4 min-w-[80px]"></th>
            </tr>
          </thead>
          
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-4 px-2 sm:px-4 flex items-center break-words">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mr-3"
                  />
                  <span className="font-medium text-sm sm:text-base">{item.name}</span>
                </td>
                
                <td className="py-4 px-2 sm:px-4 text-sm sm:text-base">₹ {item.price.toFixed(2)}</td>
                
                <td className="py-4 px-2 sm:px-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="px-2 py-1 border rounded-l disabled:opacity-50 text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 border-t border-b text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={item.quantity === 10}
                      className="px-2 py-1 border rounded-r disabled:opacity-50 text-sm"
                    >
                      +
                    </button>
                  </div>
                </td>
                
                <td className="py-4 px-2 sm:px-4 text-sm sm:text-base">
                  ₹ {(item.price * item.quantity).toFixed(2)}
                </td>
                
                <td className="py-4 px-2 sm:px-4">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-right">
        <div className="text-2xl font-bold">
          Total: ₹ {total}
        </div>
        <button 
          className="mt-4 bg-green-600 text-white w-full sm:w-auto px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Paynow btnName="Checkout" amount={total} />
        </button>
      </div>
    </div>
  );
}
