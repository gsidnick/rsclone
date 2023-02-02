import React from 'react';
import './Games.css';
import GameCard from '../GameCard/GameCard';

function Games() {
  return (
    <main className="games">
      <div className="games__container container">
        <GameCard /> 
        <GameCard /> 
        <GameCard /> 
        <GameCard /> 
        <GameCard /> 
        <GameCard /> 
        <GameCard /> 
        <GameCard /> 
        <GameCard /> 
      </div>
    </main>
  );
}

export default Games;
