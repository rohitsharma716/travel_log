import React, { useEffect, useState } from 'react';
import { getUserPlaces } from '../API';
import './UserPlaces.css';

function UserPlaces({ userId }) {
  const [places, setPlaces] = useState({ visitedPlaces: [], bucketList: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const userPlaces = await getUserPlaces(userId);
        setPlaces(userPlaces);
      } catch (error) {
        console.error('Error fetching user places:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-places">
      <div className="places-section">
        <h2>Visited Places</h2>
        <div className="places-grid">
          {places.visitedPlaces.map(place => (
            <div key={place._id} className="place-card">
              <h3>{place.title}</h3>
              <p>{place.description}</p>
              <p>Rating: {place.rating}/10</p>
              <p>Visited: {new Date(place.visitedDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="places-section">
        <h2>Bucket List</h2>
        <div className="places-grid">
          {places.bucketList.map(place => (
            <div key={place._id} className="place-card">
              <h3>{place.title}</h3>
              <p>{place.description}</p>
              <p>Coordinates: {place.latitude}, {place.longitude}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPlaces; 