import './Game1.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import useStores from '../../../hooks/useStores';

function Game1() {
  const { wordStore } = useStores();
  // const [libraryGame, setLibraryGame] = useState<IWord[]>([]);
  // const [currentWord, setCurrentWord] = useState({ word: '' });
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [voiceWord, setVoiceWord] = useState('');
  //
  // const addCorrect = props.functions.addCorrect;
  // const addError = props.functions.addError;
  // const shuffleGameNames = props.functions.shuffleGameNames;
  //
  // useEffect(() => {
  //   if (libraryGame.length === 0) {
  //     setLibraryGame([...shuffleGameNames()]);
  //   }
  //   if (libraryGame.length > 0) setCurrentWord(libraryGame[currentIndex]);
  // }, [libraryGame]);
  //
  // useEffect(() => {
  //   if (libraryGame[currentIndex]) setCurrentWord(libraryGame[currentIndex]);
  // }, [currentIndex]);
  //
  // function check() {
  //   if (!currentWord.word || !voiceWord) return null;
  //   if (currentWord.word.toLowerCase() === voiceWord.toLowerCase()) return true;
  //
  //   return false;
  // }
  //
  // function nextWord() {
  //   setVoiceWord('');
  //
  //   let currentIndexTmp = currentIndex;
  //   currentIndexTmp++;
  //
  //   if (!libraryGame[currentIndexTmp]) {
  //     setCurrentIndex(0);
  //     return;
  //   }
  //   setCurrentIndex(currentIndexTmp);
  // }
  //
  // useEffect(() => {
  //   if (check() === true) {
  //     addCorrect();
  //     nextWord();
  //   }
  //   if (check() === false) addError();
  // }, [voiceWord]);
  //
  // function voice() {
  //   const SpeechRecognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
  //
  //   SpeechRecognition.lang = 'en-EN';
  //
  //   SpeechRecognition.onresult = function (event: { results: { transcript: string }[][] }) {
  //     let word = event.results[0][0].transcript;
  //
  //     console.log(word);
  //     setVoiceWord(word);
  //   };
  //
  //   SpeechRecognition.start();
  // }

  return (
    <main className="game">
      <div className="game__container container">
        {wordStore.isLoad && <Loader />}
        {!wordStore.isLoad && (
          <>
            <h2>{wordStore.currentWord.word}</h2>
            {/*{voiceWord && <div>{voiceWord}</div>}*/}
            {/*<button onClick={voice}> Voice </button>*/}
            <Button onClick={() => wordStore.nextWord()}>Skip It</Button>
          </>
        )}
      </div>
    </main>
  );
}

export default observer(Game1);
