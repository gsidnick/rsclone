/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Loader from '../../UI/Loader/Loader';
import useStores from '../../../hooks/useStores';
import WordIteratorStore from '../../../store/WordIteratorStore';
import WordCharsStore from '../../../store/WordCharsStore';
import './Game2.css';
import Button from '../../UI/Button/Button';

const wordIteratorStore = new WordIteratorStore();
const wordCharsStore = new WordCharsStore();

function Game2() {
  const { wordStore, gameStore } = useStores();

  useEffect(() => {
    if (wordStore.isLoad === false) {
      wordIteratorStore.setWords(wordStore.words);
      wordCharsStore.setWord(wordIteratorStore.current.translation);
      wordCharsStore.setShuffleWord();
    }
  }, [wordStore.isLoad]);

  useEffect(() => {
    if (wordCharsStore.isCorrect === true) {
      gameStore.setCorrect();
      wordIteratorStore.nextWord();
    }
    if (wordCharsStore.notIsCorrect === true) {
      gameStore.setWrong();
      wordIteratorStore.nextWord();
    }
  }, [wordCharsStore.isCorrect, wordCharsStore.notIsCorrect]);

  useEffect(() => {
    if (wordIteratorStore.current !== undefined && wordStore.isLoad === false) {
      wordCharsStore.setWord(wordIteratorStore.current.translation);
      wordCharsStore.setShuffleWord();
      wordCharsStore.changeIsCorrectToFalse();
      wordCharsStore.changeNotIsCorrectToFalse();
    }
  }, [wordIteratorStore.current]);

  return (
    <div className="game">
      {wordStore.isLoad && <Loader />}
      {!wordStore.isLoad && (
        <>
          <div className="game__wrapper">
            <div className="game__word-row">{wordCharsStore.word?.map((char, index) => {
              return <span className="game__char" key={index}></span>
            })}</div>
            <div className="game__word-row">{wordCharsStore.currentWord?.map((char, index) => {
              return <span className="game__char" key={index}>{char}</span>
            })}</div>
          </div>
          <div className="game__word-row">{wordCharsStore.shuffleWord?.map((char, index) => {
            return <Button className="button_square game__char-button" onClick={() => wordCharsStore.check(char)} key={index}>{char}</Button>
          })}</div>
        </>
      )}
    </div>
  );
}

export default observer(Game2);
