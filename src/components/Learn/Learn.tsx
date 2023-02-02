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
        <div className="learn__color-container bordered">
          <div className="learn__circle-progress">
            <span className="learn__percentage">66%</span>
          </div>
          <div className="learn__color">
            <span className="learn__color-english">Color</span>
            <span className="learn__color-russian">Цвет</span>
          </div>
          <div className="learn__button">
            <div className="learn__button-arrow"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Learn;
