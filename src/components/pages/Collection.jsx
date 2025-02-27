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
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    getItems();
  }, []);

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
    <div className="min-h-screen bg-white">
      {/* Navigation remains as before */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-800">Sort:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-48 border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
            >
              <option value="">Select</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-800">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-48 border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
            >
              <option value="">All</option>
              <option value="in-stock">In Stock</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredAndSortedProducts.map((product) => (
            <Link to={`/s/${product._id}`} key={product._id}>
              <div className="group relative bg-white rounded transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="aspect-square overflow-hidden rounded-t bg-gray-50">
                  <img
                    src={product.image1}
                    alt={product.itemName}
                    loading="lazy"
                    className={`w-full h-full object-cover transform scale-80 transition-all duration-300 ${
                      loadedImages[product._id] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(product._id)}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.itemName}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price.toFixed(2)}
                    </span>
                    {product.quantity <= 0 && (
                      <span className="text-xs text-red-600 border border-red-600 px-2 py-1 rounded">
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
