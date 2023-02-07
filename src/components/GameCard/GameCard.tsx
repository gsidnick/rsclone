import React from 'react';
import './GameCard.css';
import { Link } from 'react-router-dom';

function GameCard() {
  const gamesLib = [
    { name: 'Write the translation', description: 'Say the word on the screen and check your spelling'},
    { name: 'Remember translation', description: 'Say the word on the screen and check your spelling'},
    { name: 'Speak and check ', description: 'Say the word on the screen and check your spelling'},
    { name: 'Put together a translation', description: 'Say the word on the screen and check your spelling'},
    { name: 'Check the correct one', description: 'Say the word on the screen and check your spelling'},
    { name: 'Select the right translation ', description: 'Say the word on the screen and check your spelling'},
    { name: 'Sprint by guessing', description: 'Say the word on the screen and check your spelling'},
    { name: 'Guess and listen', description: 'Say the word on the screen and check your spelling'},
    { name: 'Sprint by listen', description: 'Say the word on the screen and check your spelling'}
  ];

  return  (
    <>
      {gamesLib.map((item, index) => {
        return (
            <Link to={`/games/${index + 1}`}>
              <div className="gamecard">
                <div className="gamecard__title">
                  <h4 className="gamecard__name">{item.name}</h4>
                  <p className="gamecard__description">{item.description}</p>
                </div>
                <div className="gamecard__image-block">
                  <img className="gamecard__image" src="https://ouch-cdn2.icons8.com/z6SdE9V5igFri3ElNWyAuv3Fy3mw70QtNAbJBnCiSQw/rs:fit:252:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODUx/L2RhODljOTg1LWJi/ZTMtNGEwNC1hZTNm/LWY2ZjBlNjRjNjdm/Yi5zdmc.png" alt="" />
                </div>
              </div>
            </Link>
          ) 
      })}
    </>
  );
}

export default GameCard;
