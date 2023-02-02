import React from 'react';
import './Games.css';
import GameCards from '../GameCards/GameCards';

function Games() {
  return (
    <main className="games">
      <div className="games__container container">
        <GameCards /> 
      </div>
    </main>
  );
}

export default Games;
