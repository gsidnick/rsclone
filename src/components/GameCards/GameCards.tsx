import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import './GameCards.css';

function GameCards() {
  const { libraryGames } = useContext(AppContext);

  return (
    <main className="gamecards">
      <div className="gamecards__container container">
        {libraryGames.map((item, index) => {
          return (
            <Link className="gamecards__links" to={`/games/${index + 1}`} key={index} >
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
          );
        })}
      </div>
    </main>
  );
}

export default GameCards;
