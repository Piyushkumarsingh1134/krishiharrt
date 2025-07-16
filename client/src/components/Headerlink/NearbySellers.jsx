import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NearbySellers = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [sellers, setSellers] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingSellers, setLoadingSellers] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoadingLocation(false);
      },
      (err) => {
        console.error('Error fetching geolocation:', err);
        setError('Unable to retrieve your location.');
        setLoadingLocation(false);
      }
    );
  }, []);

  useEffect(() => {
    const fetchNearbySellers = async () => {
      if (location.latitude && location.longitude) {
        setLoadingSellers(true);
        try {
      
          const response = await axios.get('http://localhost:3000/nearby-sellers', {
            params: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          });
          setSellers(response.data);
        } catch (err) {
          console.error('Error fetching nearby sellers:', err);
          setError('Failed to fetch nearby sellers.');
        } finally {
          setLoadingSellers(false);
        }
      }
    };

    fetchNearbySellers();
  }, [location]);

  return (
    <div style={styles.container}>
      <h2>Nearby Stores</h2>

      {loadingLocation && <p>Fetching your location...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loadingLocation && !error && (
        <>
          {loadingSellers ? (
            <p>Loading nearby sellers...</p>
          ) : sellers.length > 0 ? (
            <ul style={styles.list}>
              {sellers.map((seller) => (
                <li key={seller._id} style={styles.listItem}>
                  {seller.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No nearby sellers found within a 10 km radius.</p>
          )}
        </>
      )}
    </div>
  );
};


const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    background: '#f1f1f1',
    margin: '10px 0',
    padding: '15px',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
  },
};

export default NearbySellers;

