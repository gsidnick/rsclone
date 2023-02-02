import React from 'react';
import './Library.css';

function Library() {
  return (
    <main className="library">
      <div className="library__container bordered">
        <h2 className="library__title">Add new <span className="library__title_span">Word</span></h2>
        <div className="library__inputs">
          <input className="library__input-text" type="text" /> 
          <button className="library__input-add">+</button>
        </div>
        <div className="library__card">
          <div className="library__card-header">
            <p className="library__card-text bold">Word</p>
            <p className="library__card-text bold">Translation</p>
            <p className="library__card-text bold">Learn</p>
          </div>
          <div className="library__card-label active">
            <p className="library__card-text thin">Кот</p>
            <p className="library__card-text thin">Cat</p>
            <p className="library__card-text thin">80%</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Library;
