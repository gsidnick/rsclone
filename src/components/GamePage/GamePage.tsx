import React from 'react';
import './GamePage.css';
import { useParams } from 'react-router-dom';

function GamePage() {
  const params = useParams();
  return  (
    <main className="gamepage">
      <div className="gamepage__container container">
        Game : {params.number}
      </div>
    </main>
  );
}

export default GamePage;
