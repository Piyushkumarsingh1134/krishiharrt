import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SellerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    latitude: '',
    longitude: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Function to detect user's location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoadingLocation(true);
    setError('');
    setMessage('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevData) => ({
          ...prevData,
          latitude: latitude.toFixed(6), // Limiting to 6 decimal places
          longitude: longitude.toFixed(6),
        }));
        setLoadingLocation(false);
        setMessage('Location detected successfully');
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoadingLocation(false);
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear messages when user starts editing
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing error or message
    setMessage('');
    setError('');

    // Input validation for latitude and longitude only if they are provided
    if (
      (formData.latitude && isNaN(formData.latitude)) ||
      (formData.longitude && isNaN(formData.longitude))
    ) {
      setError('Latitude and Longitude must be valid numbers');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/registerseller', formData);
      setMessage('Registration successful! Your registration will be verified soon.');
      setError('');

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        latitude: '',
        longitude: '',
      });
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while registering the seller');
      }
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Register as a Seller</h1>
        {message && <p className="text-green-500 text-center mb-3">{message}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow w-full rounded-lg divide-y divide-gray-200"
        >
          <div className="px-5 py-7">
            {/* Name Field */}
            <label htmlFor="name" className="font-semibold text-sm text-gray-600 pb-1 block">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            {/* Email Field */}
            <label htmlFor="email" className="font-semibold text-sm text-gray-600 pb-1 block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            {/* Password Field */}
            <label htmlFor="password" className="font-semibold text-sm text-gray-600 pb-1 block">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            {/* Latitude Field */}
            <label htmlFor="latitude" className="font-semibold text-sm text-gray-600 pb-1 block">
              Latitude: <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <div className="flex items-center mb-5">
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm w-full"
                placeholder="e.g., 37.7749"
              />
              <button
                type="button"
                onClick={detectLocation}
                className="ml-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                disabled={loadingLocation}
              >
                {loadingLocation ? 'Detecting...' : 'Detect Location'}
              </button>
            </div>

            {/* Longitude Field */}
            <label htmlFor="longitude" className="font-semibold text-sm text-gray-600 pb-1 block">
              Longitude: <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              placeholder="e.g., -122.4194"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              Register
            </button>
          </div>
        </form>

        {/* Back to Home Link */}
        <div className="text-center mt-5">
          <Link to="/Sellerlogin" className="text-blue-500 hover:underline">
             Login as seller
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;


