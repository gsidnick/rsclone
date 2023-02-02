import React from 'react';
import './GameCards.css';

function GameCards() {
  return (
    <div className="gamecards__block">
      <div className="gamecards__block-title">
        <h4 className="gamecards__block-name">Name of game</h4>
        <p className="gamecards__block-description">Descriptoin of game</p>
      </div>
      <div className="gamecards__block-image">
        <img className="gamecards__image" src="https://ouch-cdn2.icons8.com/z6SdE9V5igFri3ElNWyAuv3Fy3mw70QtNAbJBnCiSQw/rs:fit:252:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODUx/L2RhODljOTg1LWJi/ZTMtNGEwNC1hZTNm/LWY2ZjBlNjRjNjdm/Yi5zdmc.png" alt="" />
      </div>
    </div>
  );
}

export default GameCards;
