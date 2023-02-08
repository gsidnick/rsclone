import { useState, useEffect, ReactElement, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainContext } from '../../App';
import Game1 from '../Games/Game1';
import Game2 from '../Games/Game2';
import './GamePage.css';

function GamePage() {
  const { gamesLib, points } = useContext(MainContext);

  const [content, setContent] = useState<ReactElement | null | string>(null);
  const [name, setName] = useState<string | null>(null);
  const [failAnsw, setFailAnsw] = useState<number>(0);
  const [correctAnsw, setCorrectAnsw] = useState<number>(0);

  const params = useParams();

  useEffect(() => {
    const number: number | null = (params && params.number) ? +params.number : null;

    if (!isNaN((number as number))) {
      const gameName = gamesLib[(number as number)-1].name;
      if(gameName) setName(gameName);

      switch  (number){
        case 1:
          setContent(Game1);
          break;
        case 2:
          setContent(Game2);
          break;
        default: setContent('Game not found');
      }
    }
  },[params, gamesLib]);

  return  (
    <main className="gamepage">
      <div className="gamepage__container container">
        <div className="gamepage__header">
          <Link to={"/games/"} >
            Back
          </Link>
          <div className="gamepage__header-info">
            <span className="gamepage__fails">Fails: {failAnsw}</span>
            <span className="gamepage__correct">Correct: {correctAnsw}</span>
            <span className="gamepage__points">Points: {points}</span>
          </div>
        </div>
        <div className="gamepage__content">
          <h3>{name}</h3>
          {content}
        </div>
      </div>
    </main>
  );
}

export default GamePage;
