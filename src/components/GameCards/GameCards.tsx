import './GameCards.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { libraryGames } from '../../config/LibraryGames';

function GameCards() {

  const [lang] = useState(localStorage.getItem('i18nextLng'));

 
  return (
    <main className="gamecards">
      <div className="gamecards__container container">
        <div className="gamecards__list">
          {libraryGames.map((item, index) => {
            return (
              <Link className="gamecards__link" to={`/games/${index + 1}`} key={index}>
                <div className="gamecards__card-text">
                  <h4 className="gamecards__card-title"> {lang === 'en' ? item.name : item.nameRU}</h4>
                  <p className="gamecards__card-description"> {lang === 'en' ? item.description : item.descriptionRU}</p>
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
