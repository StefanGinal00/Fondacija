import React, { useState } from 'react';
import './sanke.css';
import Sleigh from './sanke';
import Modal from './modal';

// Funkcija za formatiranje brojeva sa razmacima
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const Track = ({ sleigh, trackImage, onSleighDrag, trackText, title, description }) => {
  const maxTotalValue = 3000000; // Maksimalna ukupna vrednost
  const stationValue = 250000; // Vrednost svake stanice
  const totalValue = sleigh.position * stationValue;

  const [isModalOpen, setIsModalOpen] = useState(false); // State za modal

  // Funkcije za otvaranje i zatvaranje modala
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="track-container">
      <div
        className="track"
        style={{ backgroundImage: `url(${trackImage})` }}
      >
        <Sleigh
          position={sleigh.position}
          onDrag={(newPosition) => onSleighDrag(newPosition)}
        />
        <div className="track-labels">
          <div className="track-label">{formatNumber(totalValue)} Ft</div>
        </div>
        <div className="track-text">
          {trackText}
        </div>
      </div>

      <div className="track-buttons">
        <button className="info-button" onClick={handleOpenModal}>
          <img src='/assets/infoDugme.png' alt="Info" />
        </button>
        <button className="www-button">
          <img src='/assets/wwwDugme.png' alt="WWW" />
        </button>
      </div>

      {/* Modal za informacije o instituciji */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title} // Naslov modala
        description={description} // Tekst opisa
      />
    </div>
  );
};

export default Track;
