import React, { useState, useEffect, useContext } from 'react';
import Auth from '../../contextAPI/Auth';
import axios from 'axios';
import baseURL from '../config/baseURL';
import ShimmerProfile from '../shimmerUI/Profile';

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useContext(Auth);

  // Fetch orders using Axios with an Authorization header
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`${baseURL}/api/user/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Extract orders from the response, ignoring excess data
        // Sort orders so that the newest (based on created_at) appear first
        const sortedOrders = response.data.data.orders.sort(
          (a, b) => b.created_at - a.created_at
        );
        setOrders(sortedOrders);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Styling function for order status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'created':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
     <ShimmerProfile/>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-10 py-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Account</h1>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      {/* Order History */}
      <section className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        {/* Fixed height container with vertical scrolling */}
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.created_at * 1000).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.currency} {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
