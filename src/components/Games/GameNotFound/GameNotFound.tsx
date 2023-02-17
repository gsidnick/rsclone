import './GameNotFound.css';
import React from 'react';
import Button from '../../UI/Button/Button';

function GameNotFound() {
  return (
    <div className="gamenotfound">
      <h1 className="gamenotfound__heading">Sorry, this game not found!</h1>
      <Button className="" to="/games/">
        Choose another game
      </Button>
    </div>
  );
}

export default GameNotFound;
