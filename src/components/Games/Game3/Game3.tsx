/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './Game3.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import useStores from '../../../hooks/useStores';
import WordIteratorStore from '../../../store/WordIteratorStore';
import WordListenStore from '../../../store/WordListenStore';
import EarSvg from '../../../images/ear.svg';
import { useTranslation } from 'react-i18next';

const wordIteratorStore = new WordIteratorStore();
const wordListenStore = new WordListenStore();

function Game3() {
  const { t } = useTranslation();

  const { wordStore, gameStore } = useStores();
  wordIteratorStore.setWords(wordStore.words);
  wordListenStore.setWords(wordStore.words);


  // const [libraryGame, setLibraryGame] = useState<IWord[]>([]);
  // const [currentWord, setCurrentWord] = useState({ word: '', translation: '' });
  // const [randomWord, setRandomWord] = useState({ word: '', translation: '' });
  // const [currentIndex, setCurrentIndex] = useState(0);
  //
  // function getRandomInt(max: number) {
  //   let prevValue = Math.floor(Math.random() * max);
  //   let nextValue = Math.floor(Math.random() * max);
  //   if (prevValue === nextValue) {
  //     return 1;
  //   } else return nextValue;
  // }
  //
  // useEffect(() => {
  //   if (libraryGame.length === 0) {
  //     setLibraryGame([...shuffleGameNames()]);
  //   }
  //   if (libraryGame.length > 0) {
  //     setCurrentWord(libraryGame[currentIndex]);
  //     setRandomWord(libraryGame[getRandomInt(libraryGame.length)]);
  //   }
  // }, [libraryGame]);
  //
  // useEffect(() => {
  //   if (libraryGame[currentIndex]) {
  //     setCurrentWord(libraryGame[currentIndex]);
  //     setRandomWord(libraryGame[getRandomInt(libraryGame.length)]);
  //   }
  // }, [currentIndex]);
  //
  // function wiretap() {
  //   const msg = new SpeechSynthesisUtterance();
  //   msg.lang = 'en-EN';
  //   msg.text = currentWord.word;
  //   window.speechSynthesis.speak(msg);
  // }
  //
  // function skipAnswer() {
  //   addError();
  //   nextWord();
  // }
  //

  return (
    <main className="game">
      {wordStore.isLoad && <Loader />}
      {!wordStore.isLoad && (
        <>
          {wordListenStore.setQuestion(wordIteratorStore.current)}
          <div className="game__container container">
            <h3 className="game__word">
            {wordIteratorStore.current.translation}
            {t('It translates as')} <span className="game__main-traslation">{wordListenStore.randomWord()} {}</span> ?
            </h3>
            <div className="game__listen-container">
            <img  src={EarSvg} onClick={() => wordListenStore.wiretap()} className="game__img-hear" alt="Ear" />
            <Button className="game__btn-next"
              onClick={() => wordIteratorStore.nextWord()}>
              <span>{t('Next word')}</span>
            </Button>
            </div>
            <div className="game__answer-container">
            <Button onClick={() => console.log('Yes')}>
              <span>{t('Yes')}</span>
            </Button>
            <Button className="button_red" onClick={() => console.log('No')} >
              <span>{t('No')}</span>
            </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default observer(Game3);
