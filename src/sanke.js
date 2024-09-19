import React, { useState, useEffect } from 'react';
import './sanke.css';

const Sleigh = ({ position, onDrag }) => {
  const stationWidth = 113; 
  const maxStations = 12; // Maksimalan broj stanica
  const leftPosition = position * stationWidth;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialLeftPosition, setInitialLeftPosition] = useState(0);

  useEffect(() => {
    const handleMouseMove = (moveEvent) => {
      if (!isDragging) return;
      const deltaX = moveEvent.clientX - startX;
      const newPosition = Math.min(Math.max(0, Math.round((initialLeftPosition + deltaX) / stationWidth)), maxStations);
      onDrag(newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchMove = (moveEvent) => {
      if (!isDragging) return;
      const deltaX = moveEvent.touches[0].clientX - startX;
      const newPosition = Math.min(Math.max(0, Math.round((initialLeftPosition + deltaX) / stationWidth)), maxStations);
      onDrag(newPosition);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX, initialLeftPosition, onDrag, stationWidth, maxStations]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
    setStartX(event.clientX);
    setInitialLeftPosition(leftPosition);
  };

  const handleTrackClick = (event) => {
    const trackLeft = event.target.getBoundingClientRect().left;
    const clickPosition = event.clientX - trackLeft;
    const newPosition = Math.min(Math.max(0, Math.round(clickPosition / stationWidth)), maxStations);
    onDrag(newPosition);
  };

      const handleTouchMove = (moveEvent) => {
      if (!isDragging) return;
      const deltaX = moveEvent.touches[0].clientX - startX;
      const newPosition = Math.min(Math.max(0, Math.round((initialLeftPosition + deltaX) / stationWidth)), maxStations);
      onDrag(newPosition);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

  return (
    <div className="track" onClick={handleTrackClick}>
      <img
        src="/assets/sanke.png"
        alt="Sleigh"
        className="sleigh"
        style={{
          left: `${leftPosition}px`,
          transition: isDragging ? 'none' : undefined,
          position: 'absolute',
        }}
        onMouseDown={handleMouseDown}
        draggable="false"
      />
    </div>
  );
};

export default Sleigh;