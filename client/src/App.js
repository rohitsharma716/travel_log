// app.tsx
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Map, { Marker } from 'react-map-gl';

// import 'my-mapbox-fork/path/to/style-sheet.css';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Marker.css';

import { useEffect } from 'react';
import { getPlaces, createLogEntry } from './API';
import LogEntryForm from './LogEntryForm';
import PlacesList from './components/PlacesList';

function MapView() {
  const [logEntry, setLogEntry] = React.useState([]);

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

  const handleSubmit = async (entry) => {
    try {
      const created = await createLogEntry(entry);
      setLogEntry(prev => [...prev, created]);
    } catch (error) {
      console.error(error);
    }
  };
    
  return (
    <>
      <div className="nav-button">
        <Link to="/places" className="list-link">View List</Link>
      </div>
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
            <div className="map-marker">
              <div className="marker-title">
                {entry.title}
              </div>
              <div className="marker-dot"></div>
              <div className="marker-tooltip">
                <div className="coordinates">
                  Lat: {entry.latitude.toFixed(4)}, Lng: {entry.longitude.toFixed(4)}
                </div>
              </div>
            </div>
          </Marker>
        ))}
      </Map>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/places" element={<PlacesList />} />
      </Routes>
    </Router>
  );
}

export default App;
