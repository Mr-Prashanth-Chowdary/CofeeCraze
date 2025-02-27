import React, { useState, useEffect } from 'react';
import baseURL from '../config/baseURL';
import axios from 'axios';

export default function Dashboard() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [keywords, setKeywords] = useState('');
  const [sizes, setSizes] = useState('');
  const [story, setStory] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [preview1, setPreview1] = useState('');
  const [preview2, setPreview2] = useState('');
  const [preview3, setPreview3] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (image1) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview1(reader.result);
      reader.readAsDataURL(image1);
    } else {
      setPreview1('');
    }
  }, [image1]);

  useEffect(() => {
    if (image2) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview2(reader.result);
      reader.readAsDataURL(image2);
    } else {
      setPreview2('');
    }
  }, [image2]);

  useEffect(() => {
    if (image3) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview3(reader.result);
      reader.readAsDataURL(image3);
    } else {
      setPreview3('');
    }
  }, [image3]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('keywords', JSON.stringify(keywords.split(',')));
    formData.append('sizes', JSON.stringify(sizes.split(',')));
    formData.append('story', story);
    formData.append('videoUrl', videoUrl);
    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);
    if (image3) formData.append('image3', image3);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${baseURL}/api/products/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Do not set Content-Type here; axios will automatically set it for FormData.
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // Clear form fields
        setItemName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setKeywords('');
        setSizes('');
        setStory('');
        setVideoUrl('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setPreview1('');
        setPreview2('');
        setPreview3('');

        // Show success popup
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      } else {
        console.error('Failed to upload data');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Product Dashboard</h1>

        {/* Image Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Product Images (Required)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <label
                key={num}
                className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (num === 1) setImage1(file);
                    if (num === 2) setImage2(file);
                    if (num === 3) setImage3(file);
                  }}
                  className="hidden"
                  required
                />
                {preview1 && num === 1 ? (
                  <img src={preview1} alt="Preview 1" className="h-full w-full object-cover rounded-lg" />
                ) : preview2 && num === 2 ? (
                  <img src={preview2} alt="Preview 2" className="h-full w-full object-cover rounded-lg" />
                ) : preview3 && num === 3 ? (
                  <img src={preview3} alt="Preview 3" className="h-full w-full object-cover rounded-lg" />
                ) : (
                  <div className="text-gray-500">
                    <span className="block text-center">Click to upload image {num}</span>
                    <span className="block text-center text-sm">PNG, JPG, JPEG</span>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keywords (comma separated) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Sizes (comma separated) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Story <span className="text-red-500">*</span>
              </label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full p-2 border rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Submit Product
        </button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Data successfully added to the database!
        </div>
      )}
    </div>
  );
}
