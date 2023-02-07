import React from 'react';
import './GameCards.css';
import { Link } from 'react-router-dom';

function GameCards() {
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
    <main className="gamecards">
      <div className="gamecards__container container">
        {gamesLib.map((item, index) => {
          return (
              <Link to={`/games/${index + 1}`} key={index} className="gamecards__links" >
                <div className="gamecards__shell">
                  <div className="gamecards__title">
                    <h4 className="gamecards__name">{item.name}</h4>
                    <p className="gamecards__description">{item.description}</p>
                  </div>
                  <div className="gamecards__image-block">
                    <img className="gamecards__image" src="https://ouch-cdn2.icons8.com/z6SdE9V5igFri3ElNWyAuv3Fy3mw70QtNAbJBnCiSQw/rs:fit:252:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODUx/L2RhODljOTg1LWJi/ZTMtNGEwNC1hZTNm/LWY2ZjBlNjRjNjdm/Yi5zdmc.png" alt="" />
                  </div>
                </div>
              </Link>
            ) 
        })}
      </div>
    </main>
  );
}

export default GameCards;
