import { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../../App';
import Game1 from '../Games/Game1';
import Game2 from '../Games/Game2';
import Game3 from '../Games/Game3';
import IGameData from '../../interfaces/IGameData';
import IWord from '../../interfaces/IWord';
import './GamePage.css';

const libraryComponents = [Game1, Game2, Game3];

function GamePage() {
  const params = useParams();
  const { libraryGames, points, library, setPoints } = useContext(AppContext);
  const number = Number(params.number);
  const Component: null | ((props: IGameData) => React.ReactElement) = libraryComponents[number - 1] || null;
  const name = libraryGames[number -1].name || '';

  const [failAnsw, setFailAnsw] = useState<number>(0);
  const [correctAnsw, setCorrectAnsw] = useState<number>(0);

  function addError() {
    let count = failAnsw;
    count++;

    setFailAnsw(count);
  };

  function addCorrect() {
    let count = correctAnsw;
    count++;

    let countPoints = points;
    countPoints++;

    setCorrectAnsw(count);
    setPoints(countPoints);
  };

  function shuffleGameNames() {
    let libraryTmp: IWord[] = [];
    
    while(true) {
      let index = Math.floor(Math.random() * library.length);
      let word = library[index];

      if (libraryTmp.length === library.length) break;

      if (!libraryTmp.includes(word)) libraryTmp.push(word)
    }
    return libraryTmp;
  };

  return  (
    <main className="gamepage">
      <div className="gamepage__container container">
        <div className="gamepage__header">
          <Link to={"/games/"} >Back</Link>
          <div className="gamepage__header-info">
            <span className="gamepage__fails">Fails: {failAnsw}</span>
            <span className="gamepage__correct">Correct: {correctAnsw}</span>
            <span className="gamepage__points">Points: {points}</span>
          </div>
        </div>
        <div className="gamepage__content">
          {name && <h3>{name}</h3>}
          {!Component ? <>Game not found</> : <Component functions={{ addCorrect, addError, shuffleGameNames }}/>}
        </div>
      </div>
    </main>
  );
}

export default GamePage;
