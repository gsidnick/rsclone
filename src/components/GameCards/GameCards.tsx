import './GameCards.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { libraryGames } from '../../config/LibraryGames';

function GameCards() {
  return (
    <main className="gamecards">
      <div className="gamecards__container container">
        <div className="gamecards__list">
          {libraryGames.map((item, index) => {
            return (
              <Link className="gamecards__link" to={`/games/${index + 1}`} key={index}>
                <div className="gamecards__card-text">
                  <h4 className="gamecards__card-title">{item.name}</h4>
                  <p className="gamecards__card-description">{item.description}</p>
                </div>
                <div className="gamecards__card-image-block">
                  <img className="gamecards__card-image" src={item.image} alt="" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default GameCards;
