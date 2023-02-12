import './Home.css';
import React, { useContext } from 'react';
import { MainContext } from '../../App';

function Home() {
  const { points } = useContext(MainContext);

  return (
    <main className="home">
      <div className="home__container container">
        <div className="home__game">
          <h2 className="home__game-title">Start random game</h2>
          <button className="home__game-play">Play</button>
        </div>
        <div className="home__score">
          <div className="home__card-label">Score</div>
          <div className="home__card-value">{points} points</div>
        </div>
        <div className="home__level">
          <div className="home__card-label">Level</div>
          <div className="home__card-value">3 level</div>
        </div>
      </div>
    </main>
  );
}

export default Home;
