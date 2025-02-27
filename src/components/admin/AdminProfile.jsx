import React, { useState, useEffect, useContext } from 'react';
import Auth from '../../contextAPI/Auth';
import axios from 'axios';
import baseURL from '../config/baseURL';

export default function AdminProfile() {
    const [yetToBeShippedOrders, setYetToBeShippedOrders] = useState([]);
    const [shippedOrders, setShippedOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('yet_to_be_shipped');
    const { logout } = useContext(Auth);

    // Fetch admin order list and filter orders
    const fetchOrders = () => {
        const token = localStorage.getItem('token');

        axios
            .get(`${baseURL}/api/admin/order-list`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const allOrders = response.data;

                // Filter based on order status
                const yetToBeShipped = allOrders.filter(order => order.orderStatus === 'yet_to_be_Shipped');
                const shipped = allOrders.filter(order => order.orderStatus === 'shipped');

                setYetToBeShippedOrders(yetToBeShipped);
                setShippedOrders(shipped);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Mark order as shipped
    const markAsShipped = (orderId) => {
        const token = localStorage.getItem('token');

        axios
            .patch(
                `${baseURL}/api/admin/order/${orderId}/ship`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                alert('Order marked as shipped!');
                fetchOrders(); // Refresh order lists
            })
            .catch((err) => {
                console.error('Failed to update order:', err);
                alert('Failed to mark as shipped.');
            });
    };

    // Styling function for order status
    const getStatusStyle = (status) => {
        switch (status) {
            case 'yet_to_be_shipped':
                return 'text-yellow-600 bg-yellow-100';
            case 'shipped':
                return 'text-blue-600 bg-blue-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg text-gray-700">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg text-gray-700">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto my-10 py-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Admin Dashboard</h1>
                <button
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                    onClick={logout}
                >
                    Logout
                </button>
            </header>

            {/* Tabs for filtering orders */}
            <div className="mb-6">
                <button
                    className={`px-4 py-2 rounded-lg mr-4 text-sm font-medium ${
                        activeTab === 'yet_to_be_shipped'
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                    onClick={() => setActiveTab('yet_to_be_shipped')}
                >
                    Yet to be Shipped ({yetToBeShippedOrders.length})
                </button>

                <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        activeTab === 'shipped'
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                    onClick={() => setActiveTab('shipped')}
                >
                    Shipped ({shippedOrders.length})
                </button>
            </div>

            {/* Order Table Based on Active Tab */}
            <section className="bg-white shadow rounded-lg p-6 overflow-x-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {activeTab === 'yet_to_be_shipped' ? 'Yet to be Shipped Orders' : 'Shipped Orders'}
                </h2>

                <div className="max-h-96 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Order ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">User Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">User Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Amount Paid</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Order Status</th>
                                {activeTab === 'yet_to_be_shipped' && (
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Action</th>
                                )}
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {(activeTab === 'yet_to_be_shipped' ? yetToBeShippedOrders : shippedOrders).length > 0 ? (
                                (activeTab === 'yet_to_be_shipped' ? yetToBeShippedOrders : shippedOrders).map((order) => (
                                    <tr key={order.orderId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.amountPaid}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(order.orderStatus)}`}
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        {activeTab === 'yet_to_be_shipped' && (
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
                                                    onClick={() => markAsShipped(order.orderId)}
                                                >
                                                    Mark as Shipped
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={activeTab === 'yet_to_be_shipped' ? 6 : 5} className="px-6 py-4 text-center text-gray-500">
                                        No {activeTab === 'yet_to_be_shipped' ? 'pending' : 'shipped'} orders available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}