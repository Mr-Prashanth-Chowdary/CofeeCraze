import React, { useContext, useEffect, useState } from "react";
import Auth from "../../contextAPI/Auth";
import axios from "axios";
import baseURL from "../config/baseURL";

export default function Profile() {
  const { logout } = useContext(Auth);
  const [orderData, setOrderData] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/user/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAddress(data.data.address || []);
        setOrderData(data.data.orders || []); // Ensure orders array is set
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className=" text-xs md:text-sm mx-6 h-svh">
      <h1 className="text-5xl">Account</h1>
      <button onClick={logout} className="my-5">
        Logout
      </button>
      <hr />
      <div className="my-5">
        <p className="text-center my-3 text-2xl">Order History</p>
        <div className="flex justify-center w-full max-h-[500px] overflow-auto">
          <table className="border-[1px] border-black w-[70%] text-center">
            <thead className="">
              <tr className="border-[1px] bg-black/30">
                <th className="py-5">Order</th>
                <th>Date</th>
                <th>Payment Status</th>
                <th>Fulfillment Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="">
              {orderData.length > 0 ? (
                orderData.map((orderObj, index) => (
                  <tr key={index} className="border-[1px]">
                    <td className="py-4 underline">{orderObj.id || `#${index + 1}`}</td>
                    <td>{orderObj.created_at ? new Date(orderObj.created_at * 1000).toLocaleDateString() : "N/A"}</td>
                    <td>{orderObj.status === 'paid' ? 'paid' : 'unpaid' || "Unpaid"}</td>
                    <td>{orderObj.status === 'paid' ? 'fulfilled' : 'Pending' || "Pending"}</td>
                    <td>₹ {orderObj.amount || "0"}</td>
                  </tr>
                ))
                
              ) : (
                <tr>
                  <td colSpan="5" className="py-4">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {address.length > 0 ? (
        <div className="my-5 border-[1px] p-4">
          <p className="text-center text-2xl">Address</p>
          <div className="mt-4">
            {address.map((addressItem, index) => (
              <div key={index} className="mb-2">
                <p><strong>Street:</strong> {addressItem.street}</p>
                <p><strong>City:</strong> {addressItem.city}</p>
                <p><strong>State:</strong> {addressItem.state}</p>
                <p><strong>Postal Code:</strong> {addressItem.postalCode}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-5 text-center">No address available</div>
      )}
    </div>
  );
}
