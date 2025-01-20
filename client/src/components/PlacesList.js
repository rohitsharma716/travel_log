import React from 'react';
import { Link } from 'react-router-dom';
import { getPlaces, updatePlaceStatus } from '../API';
import './PlacesList.css';

const PlacesList = ({ userId }) => {
  const [places, setPlaces] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getPlaces();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleStatusUpdate = async (placeId, status) => {
    try {
      await updatePlaceStatus(userId, placeId, status);
      // Refresh places after update
      const data = await getPlaces();
      setPlaces(data);
    } catch (error) {
      console.error("Error updating place status:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading places...</div>;
  }

  return (
    <div className="places-list-container">
      <header className="places-header">
        <h1>My Travel Log</h1>
        <Link to="/" className="map-link">View Map</Link>
      </header>
      
      <div className="places-grid">
        {places.map(place => (
          <div key={place._id} className="place-card">
            {place.image && (
              <img 
                src={place.image} 
                alt={place.title} 
                className="place-image"
              />
            )}
            <div className="place-info">
              <h2>{place.title}</h2>
              <p className="coordinates">
                Lat: {place.latitude.toFixed(4)}, Lng: {place.longitude.toFixed(4)}
              </p>
              {place.description && (
                <p className="description">{place.description}</p>
              )}
              <div className="place-meta">
                <span className="rating">Rating: {place.rating}/10</span>
                <span className="date">
                  Visited: {new Date(place.visitedDate).toLocaleDateString()}
                </span>
              </div>
              {place.comments && (
                <p className="comments">{place.comments}</p>
              )}
            </div>
            <div className="place-actions">
              <button 
                onClick={() => handleStatusUpdate(place._id, 'visited')}
                className="status-button visited"
              >
                Mark as Visited
              </button>
              <button 
                onClick={() => handleStatusUpdate(place._id, 'bucket')}
                className="status-button bucket"
              >
                Add to Bucket List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesList; 