import React from 'react';
import './Modal.css'; // Stilizacija za modal

const Modal = ({ title, description, isOpen, onClose }) => {
  if (!isOpen) return null; // Ne prikazuj modal ako nije otvoren

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <img src="/assets/izlaz.png" alt="Zatvori" className="close-icon" />
        </button>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Modal;
