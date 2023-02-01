import React from 'react';
import './Learn.css';

function Learn() {
  return (
    <main className="learn">
      <div className="learn__progress">
        <input type="range" className="learn__input" />
      </div>
      <div className="learn__container container">
        <div className="learn__points">
          <h3 className="learn__points-score">Points:123</h3>
        </div>
        <div className="learn__color-container">
          <div className="learn__circle-progress">
            <span className="learn__percentage">66%</span>
          </div>
          <div className="learn__color">
            <p className="learn__color-english">Color</p>
            <p className="learn__color-russian">Цвет</p>
          </div>
          <div className="learn__butoon-container">
            <button className="learn__button">→</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Learn;
