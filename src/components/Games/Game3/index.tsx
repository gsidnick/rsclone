/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import IGameData from '../../../interfaces/IGameData';
import IWord from '../../../interfaces/IWord';
import EarImg from '../../../images/ear.svg';
import './style.css';

function Game3(props: IGameData) {
  const [libraryGame, setLibraryGame] = useState<IWord[]>([]);
  const [currentWord, setCurrentWord] = useState({ word: '', translation: '' });
  const [randomWord, setRandomWord] = useState({ word: '', translation: '' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const addCorrect = props.functions.addCorrect;
  const addError = props.functions.addError;
  const shuffleGameNames = props.functions.shuffleGameNames;

  function nextWord() {
    let currentIndexTmp = currentIndex;
    currentIndexTmp++;

    if(!libraryGame[currentIndexTmp]) {
      setCurrentIndex(0);
      return;
    };
    setCurrentIndex(currentIndexTmp);
  }

  function getRandomInt(max: number) {
    let prevValue = Math.floor(Math.random() * max);
    let nextValue = Math.floor(Math.random() * max);
    if (prevValue === nextValue) {
      return 1
    }
    else return nextValue;
  }

  useEffect(() => {
    if (libraryGame.length === 0) {
      setLibraryGame([...shuffleGameNames()]);
    };
    if (libraryGame.length > 0) {
      setCurrentWord(libraryGame[currentIndex]);
      setRandomWord(libraryGame[getRandomInt(libraryGame.length)]);
    };
  }, [libraryGame]);

  useEffect(() => {
    if(libraryGame[currentIndex]) {
      setCurrentWord(libraryGame[currentIndex]);
      setRandomWord(libraryGame[getRandomInt(libraryGame.length)]);
    };
  }, [currentIndex]);
  
  function wiretap() {
      const msg = new SpeechSynthesisUtterance();
      msg.lang = 'en-EN';
      msg.text = currentWord.word;
      window.speechSynthesis.speak(msg);
   }

   function scipAnswer(){
    addError();
    nextWord();
   }

   function checkYes() {
    if (randomWord.word.toLowerCase() === currentWord.word.toLowerCase()) {
      addCorrect();
      nextWord();
    } else {
      addError();
      nextWord();
    };
   }

   function checkNo() {
    if (randomWord.word.toLowerCase() !== currentWord.word.toLowerCase()) {
      addCorrect();
      nextWord();
    } else {
      addError();
      nextWord();
    };
   }

  return (
    <main className="game">
      <div className="game__container container">
        <h3 className="game__word">
          It translates as <span className="game__main-traslation">{randomWord.translation}</span> ?
        </h3>
        <div className="game__listen-container">
          <img onClick={wiretap} src={EarImg} className="game__img-hear" alt="Ear" />
          <button onClick={scipAnswer} className="game__btn-next"> Next word</button>
        </div>
        <div className="game__answer-container">
          <button onClick={checkYes} className="game_btn-yes">Yes</button>
          <button onClick={checkNo} className="game_btn-no">No</button>
        </div>

      </div>
    </main>
  );
}

export default Game3;
