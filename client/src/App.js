// app.tsx
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Map, { Marker } from 'react-map-gl';

// import 'my-mapbox-fork/path/to/style-sheet.css';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Marker.css';
import './App.css';

import { useEffect, useState } from 'react';
import { getPlaces, createLogEntry, getUserPlaces, updatePlaceStatus } from './API';
import LogEntryForm from './LogEntryForm';
import PlacesList from './components/PlacesList';
import Auth from './components/Auth';
import UserMenu from './components/UserMenu';
import UserPlaces from './components/UserPlaces';
import PlaceDetails from './components/PlaceDetails';

function MapView({ userId }) {
  const [logEntry, setLogEntry] = React.useState([]);
  const [userPlaces, setUserPlaces] = useState({ visitedPlaces: [], bucketList: [] });
  const [selectedPlace, setSelectedPlace] = useState(null);

  const getEntries = async () => {
    try {
      const data = await getPlaces();
      setLogEntry(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };
 
  useEffect(() => {
    getEntries();
  }, []);

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const places = await getUserPlaces(userId);
        setUserPlaces(places);
      } catch (error) {
        console.error('Error fetching user places:', error);
      }
    };

    fetchUserPlaces();
  }, [userId]);

  const handleSubmit = async (entry) => {
    try {
      const created = await createLogEntry(entry);
      setLogEntry(prev => [...prev, created]);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceStatus = async (placeId, status) => {
    try {
      await updatePlaceStatus(userId, placeId, status);
      const updatedPlaces = await getUserPlaces(userId);
      setUserPlaces(updatedPlaces);
    } catch (error) {
      console.error('Error updating place status:', error);
    }
  };

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  return (
    <>
      <LogEntryForm onSubmit={handleSubmit} />
      <Map
        mapboxAccessToken="pk.eyJ1Ijoicm9oaXRzaGFybWE3MTY0IiwiYSI6ImNsa2dkeGJjaDFvYWozZnRqaGs3bGlxcjkifQ.LsIWkbpUWcbWTDGLhoOAyQ"
        initialViewState={{
          longitude: 77.2177,
          latitude: 28.6304,
          zoom: 11
        }}
        style={{width: '100%', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {logEntry.map(entry => (
          <Marker 
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-7.5}
            offsetTop={-7.5}
          >
            <div className="map-marker" onClick={() => handleMarkerClick(entry)}>
              <div className="marker-title">
                {entry.title}
              </div>
              <div className="marker-dot"></div>
            </div>
          </Marker>
        ))}
      </Map>

      {selectedPlace && (
        <PlaceDetails
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onStatusUpdate={handlePlaceStatus}
          isVisited={userPlaces.visitedPlaces.some(p => p._id === selectedPlace._id)}
          isBucketList={userPlaces.bucketList.some(p => p._id === selectedPlace._id)}
        />
      )}
    </>
  );
}

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleLogin = (newUserId) => {
    setUserId(newUserId);
    localStorage.setItem('loginTime', new Date().toISOString());
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('loginTime');
  };

  if (!userId) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <div className="nav-left">
            <div className="nav-links">
              <Link to="/places" className="list-link">View List</Link>
              <Link to="/my-places" className="list-link">My Places</Link>
            </div>
          </div>
          {window.location.pathname === '/' && (
            <div className="nav-right">
              <UserMenu userId={userId} onLogout={handleLogout} />
            </div>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<MapView userId={userId} />} />
          <Route path="/places" element={<PlacesList userId={userId} />} />
          <Route path="/my-places" element={<UserPlaces userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
