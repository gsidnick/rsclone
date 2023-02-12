/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainContext } from '../../App';
import Game1 from '../Games/Game1';
import Game2 from '../Games/Game2';
import './GamePage.css';
import ILibrary from '../../interfaces/ILibrary';
import IGameData from '../../interfaces/IGameData';

const libraryComponents = [Game1, Game2];

function GamePage() {
  const params = useParams();

  const { gamesLib, points, library, setPoints } = useContext(MainContext);

  const number = Number(params.number); // Определяем number игры по url

  /* TODO: Разобраться с типизацией!! */
  const Component: null | ((props: IGameData) => React.ReactElement) = libraryComponents[number - 1] || null; // Определяем компонет игры по number

  const name = gamesLib[number -1].name || ''; // Определяем название игры по number

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
    let libraryTmp: ILibrary[] = [];
    
    while(true) {
      let index = Math.floor(Math.random() * library.length);
      let word = library[index];

      if (libraryTmp.length === library.length) break

      if (!libraryTmp.includes(word)) libraryTmp.push(word)
    }
    return libraryTmp;
  };

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
          {name && <h3>{name}</h3>}
          {!Component ? <>Game not found</> : <Component functions={{addCorrect, addError, shuffleGameNames}}/>}
        </div>
      </div>
    </main>
  );
}

export default GamePage;
