// src/components/UploadPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {

  const [formData, setFormData] = useState({
    name: '',
    tags: '',
    description: '',
    price: '',
    imagefile: null,
  });

 
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagefile') {
      setFormData({ ...formData, imagefile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { name, tags, description, price, imagefile } = formData;
    if (!name || !tags || !description || !price || !imagefile) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Prepare form data for multipart/form-data
    const data = new FormData();
    data.append('name', name);
    data.append('tags', tags);
    data.append('description', description);
    data.append('price', price);
    data.append('imagefile', imagefile);

    try {
      setLoading(true);

     
      const token = localStorage.getItem('token');

      
      const res = await axios.post('http://localhost:3000/imageupload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, 
        },
      });

      if (res.status === 200 && res.data.success) {
        setSuccessMessage('Product uploaded successfully!');
        setFormData({
          name: '',
          tags: '',
          description: '',
          price: '',
          imagefile: null,
        });
      } else {
        setErrorMessage(res.data.message || 'Failed to upload product.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload New Product</h2>
     
      {successMessage && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
          {successMessage}
        </div>
      )}

  
      {errorMessage && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
   
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product name"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Seeds, Fertilizers"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product description"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price 
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product price"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="imagefile" className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            name="imagefile"
            id="imagefile"
            accept="image/*"
            onChange={handleChange}
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Uploading...' : 'Upload Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;

