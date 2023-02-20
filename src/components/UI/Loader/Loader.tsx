import './Loader.css';
import React, { useEffect } from 'react';

function Loader() {
  useEffect(() => {
    const loader = document.querySelector('.loader');

    if(localStorage.getItem('theme') === 'dark') {
        loader?.classList.remove('light');
        loader?.classList.add('dark');
      } else {
        loader?.classList.remove('dark');
        loader?.classList.add('light');
      }
  }, []);

  return (
    <div className="loader">
      <span className="loader__spinner"></span>
    </div>
  );
}

export default Loader;
