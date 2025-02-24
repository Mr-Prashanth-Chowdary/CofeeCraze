import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import baseURL from '../config/baseURL';

export default function Collection() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/products`);
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    getItems();
  }, []);

  // Sorting and filtering logic using product.quantity
  const filteredAndSortedProducts = [...products]
    .filter((product) => (filter === 'in-stock' ? product.quantity > 0 : true))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return 0;
    });

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 mr-2">Sort:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
              <option value="">Select</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 mr-2">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
              <option value="">All</option>
              <option value="in-stock">In Stock</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Responsive Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <Link to={`/s/${product._id}`} key={product._id}>
              <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
                <div className="aspect-square overflow-hidden rounded-t-xl bg-gray-100">
                  <img
                    src={product.image1}
                    alt={product.itemName}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      loadedImages[product._id] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(product._id)}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.itemName}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">
                      ₹{product.price.toFixed(2)}
                    </span>
                    {product.quantity <= 0 && (
                      <span className="text-xs text-red-600 px-2 py-1 rounded-full bg-red-50">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
