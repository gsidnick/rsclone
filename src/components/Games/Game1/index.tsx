/* eslint-disable @typescript-eslint/no-unused-vars */
import './style.css'
import { useEffect, useState } from 'react';
import ILibrary from '../../../interfaces/ILibrary';
import IGameData from '../../../interfaces/IGameData';

function Game1(props: IGameData) {
  const [
    library, 
    librarySaved,
    points, 
    failAnsw, 
    correctAnsw, 
    currentIndex,
    currentWord,
    setPoints, 
    setFailAnsw, 
    setCorrectAnsw,
    setCurrentWord,
    setCurrentIndex,
  ] = props.data;

  useEffect(() => {
    if ((library as ILibrary[])[(currentIndex as number)]) setCurrentWord((library as ILibrary[])[(currentIndex as number)]);
  },[library, currentIndex, setCurrentWord]);

  function nextWord() {
    let currentIndexTmp = currentIndex;
    (currentIndexTmp as number)++;

    if(!(library as ILibrary[])[(currentIndexTmp as number)]) return;
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
