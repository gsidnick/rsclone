import './OverlayLoader.css';
import React from 'react';
import Loader from '../Loader/Loader';

function OverlayLoader() {
  return (
    <div className="overlay">
      <Loader />
    </div>
  );
}

export default OverlayLoader;
