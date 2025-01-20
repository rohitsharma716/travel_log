import React from 'react';

const PlaceDetails = ({ place, onClose, onStatusUpdate, isVisited, isBucketList }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="place-details-modal">
        <div className="place-details-header">
          <h2 className="place-details-title">{place.title}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="place-details-content">
          <p className="place-details-info">
            <strong>Location:</strong> {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
          </p>
          {place.description && (
            <p className="place-details-info">
              <strong>Description:</strong> {place.description}
            </p>
          )}
          {place.comments && (
            <p className="place-details-info">
              <strong>Comments:</strong> {place.comments}
            </p>
          )}
          <p className="place-details-info">
            <strong>Rating:</strong> {place.rating}/10
          </p>
          <p className="place-details-info">
            <strong>Visited Date:</strong> {new Date(place.visitedDate).toLocaleDateString()}
          </p>
        </div>

        <div className="place-details-actions">
          <button 
            className={`action-button visited-button ${isVisited ? 'active' : ''}`}
            onClick={() => onStatusUpdate(place._id, 'visited')}
          >
            {isVisited ? '✓ Visited' : 'Mark as Visited'}
          </button>
          <button 
            className={`action-button bucket-button ${isBucketList ? 'active' : ''}`}
            onClick={() => onStatusUpdate(place._id, 'bucket')}
          >
            {isBucketList ? 'In Bucket List' : 'Add to Bucket List'}
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaceDetails; 