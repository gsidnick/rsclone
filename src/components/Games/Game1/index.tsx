/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import IWord from '../../../interfaces/IWord';
import IGameData from '../../../interfaces/IGameData';
import './style.css';

function Game1(props: IGameData) {
  const [libraryGame, setLibraryGame] = useState<IWord[]>([]);
  const [currentWord, setCurrentWord] = useState({ word: '' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const [voiceWord, setVoiceWord] = useState('');

  const addCorrect = props.functions.addCorrect;
  const addError = props.functions.addError;
  const shuffleGameNames = props.functions.shuffleGameNames;

  useEffect(() => {
    if (libraryGame.length === 0) {
      setLibraryGame([...shuffleGameNames()]);
    };
    if (libraryGame.length > 0) setCurrentWord(libraryGame[currentIndex]);
  }, [libraryGame]);

  useEffect(() => {
    if(libraryGame[currentIndex]) setCurrentWord(libraryGame[currentIndex]);
  }, [currentIndex]);

  function check() {
    if(!currentWord.word || !voiceWord) return null;
    if(currentWord.word.toLowerCase() === voiceWord.toLowerCase()) return true;

    return false;
  }

  function nextWord() {
    setVoiceWord('');

    let currentIndexTmp = currentIndex;
    currentIndexTmp++;

    if(!libraryGame[currentIndexTmp]) {
      setCurrentIndex(0);
      return;
    };
    setCurrentIndex(currentIndexTmp);
  }

  useEffect(() => {
    if (check() === true) {
      addCorrect();
      nextWord();
    }
    if (check() === false) addError();
  }, [voiceWord]);

  function voice() {
    const SpeechRecognition = new (
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    )();

    SpeechRecognition.lang = 'en-EN';

    SpeechRecognition.onresult = function(event: {results: {transcript: string}[][]}){
      let word = event.results[0][0].transcript;

      console.log(word);
      setVoiceWord(word);
    };

    SpeechRecognition.start();
  }

  return (
    <main className="game">
      <div className="game__container container">
        <h2>{currentWord.word}</h2>
        {voiceWord && <div>{voiceWord}</div>}
        <button onClick={voice}> Voice </button>
        <button onClick={nextWord}>Skip it</button>
      </div>
    </main>
  );
}

export default Game1;
