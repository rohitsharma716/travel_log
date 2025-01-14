import React, { useState } from 'react';
import './LogEntryForm.css';

const LogEntryForm = ({ onClose, onSubmit }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    comments: '',
    rating: 1,
    latitude: '',
    longitude: '',
    visitedDate: new Date().toISOString().split('T')[0],
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== 'rohit110040') {
      setError('Incorrect password');
      return;
    }
    
    const submitData = { ...formData };
    delete submitData.password;
    
    onSubmit(submitData);
    setFormData({
      title: '',
      description: '',
      comments: '',
      rating: 1,
      latitude: '',
      longitude: '',
      visitedDate: new Date().toISOString().split('T')[0],
      password: ''
    });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isCollapsed) {
    return (
      <div className="entry-form collapsed" onClick={() => setIsCollapsed(false)}>
        <span>+</span>
      </div>
    );
  }

  return (
    <div className="entry-form">
      <button className="toggle-button" onClick={() => setIsCollapsed(true)}>
        −
      </button>
      <form onSubmit={handleSubmit}>
        <h3>Add New Location</h3>
        
        <div className="password-section">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <div className="error-message">{error}</div>}
        </div>

        <input
          type="text"
          name="title"
          placeholder="Place Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="latitude"
          placeholder="Latitude"
          step="any"
          value={formData.latitude}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="longitude"
          placeholder="Longitude"
          step="any"
          value={formData.longitude}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <textarea
          name="comments"
          placeholder="Comments"
          value={formData.comments}
          onChange={handleChange}
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (1-10)"
          min="1"
          max="10"
          value={formData.rating}
          onChange={handleChange}
        />

        <input
          type="date"
          name="visitedDate"
          value={formData.visitedDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default LogEntryForm; 