import './Game.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import useStores from '../../hooks/useStores';
import WordIteratorStore from '../../store/WordIteratorStore';
import WordCharsStore from '../../store/WordCharsStore';
import GameEndMessage from '../Messages/GameEndMessage';
import ProgressBar from '../UI/ProgressBar/ProgressBar';

const wordIteratorStore = new WordIteratorStore();
const wordCharsStore = new WordCharsStore();

function Game2() {
  const { t } = useTranslation();
  const { wordStore, gameStore, modalStore } = useStores();

  function skipButtonHandler() {
    wordIteratorStore.nextWord();
    wordCharsStore.cleanCurrentWord();
  }

  function windowHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') wordIteratorStore.nextWord();
  }

  useEffect(() => {
    if (!wordStore.isLoading) {
      wordIteratorStore.setWords(wordStore.words);
      gameStore.setTotal(wordStore.words.length);
      gameStore.iterator = wordIteratorStore;
      wordCharsStore.setWord(wordIteratorStore.current.translation);
      wordCharsStore.setShuffleWord();
      window.addEventListener('keydown', windowHandler);
    }
    return () => {
      window.removeEventListener('keydown', windowHandler);
    };
  }, [wordStore.isLoading]);

  useEffect(() => {
    if (wordIteratorStore.current !== undefined && !wordStore.isLoading) {
      wordCharsStore.setWord(wordIteratorStore.current.translation);
      wordCharsStore.setShuffleWord();
      wordCharsStore.changeIsCorrectToFalse();
      wordCharsStore.changeNotIsCorrectToFalse();
    }
  }, [wordIteratorStore.current]);

  useEffect(() => {
    if (wordIteratorStore.isEnd) {
      modalStore.openModal(<GameEndMessage />);
    }
  }, [wordIteratorStore.isEnd]);

  useEffect(() => {
    if (wordCharsStore.isCorrect) {
      gameStore.setCorrect();
      wordIteratorStore.nextWord();
    }
    if (wordCharsStore.notIsCorrect) {
      gameStore.setWrong();
      wordIteratorStore.nextWord();
    }
  }, [wordCharsStore.isCorrect, wordCharsStore.notIsCorrect]);

  return (
    <div className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && wordStore.words.length > 0 && <ProgressBar value={wordIteratorStore.setProgress()} />}
      {!wordStore.isLoading && (
        <>
          <div className="game__word-row game__word-row-none">
            {wordCharsStore.word.map((char, index) => {
              return <span className="game__char game__char-none" key={index}></span>;
            })}
          </div>
          <h2 className="game__word">{wordIteratorStore.current.word}</h2>
          <div className="game__wrapper">
            <div className="game__word-row">
              {wordCharsStore.word.map((char, index) => {
                return <span className="game__char" key={index}></span>;
              })}
            </div>
            <div className="game__word-row">
              {wordCharsStore.currentWord.map((char, index) => {
                return (
                  <span className="game__char" key={index}>
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="game__wrapper">
            <div className="game__word-row">
              {wordCharsStore.shuffleWord.map((char, index) => {
                return (
                  <Button
                    className="button_square game__char-button"
                    onClick={() => wordCharsStore.check(index)}
                    key={index}
                  >
                    {char}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="game__group-controls">
            <Button className="button_red" onClick={skipButtonHandler}>
              <>{t('Skip it')}</>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(Game2);
