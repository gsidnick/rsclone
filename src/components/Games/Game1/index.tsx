/* eslint-disable @typescript-eslint/no-unused-vars */
import './style.css'
import { useEffect, useState } from 'react';
import ILibrary from '../../../interfaces/ILibrary';
import IGameData from '../../../interfaces/IGameData';

function Game1(props: IGameData) {
  const [library, points, failAnsw, correctAnsw, setPoints, setFailAnsw, setCorrectAnsw] = props.data;
  const [currentWord, setCurrentWord] = useState({
    word: 'Chair', translate: 'Стул'
  });
  console.log(library);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if ((library as ILibrary[])[currentIndex]) setCurrentWord((library as ILibrary[])[currentIndex]);
  },[library, currentIndex]);

  function nextWord() {
    let currentIndexTmp = currentIndex;
    currentIndexTmp++;

    if(!(library as ILibrary[])[currentIndexTmp]) return;
    setCurrentIndex(currentIndexTmp);
  }
  return (
    <main className="game">
      <div className="game__container container">
        Game 1(One) content
      </div>
    </main>
  )
}

export default Game1;
