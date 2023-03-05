import './Game.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import useStores from '../../hooks/useStores';
import WordIteratorStore from '../../store/WordIteratorStore';
import WordListenStore from '../../store/WordListenStore';
import { useTranslation } from 'react-i18next';
import GameEndMessage from '../Messages/GameEndMessage';
import EarSvg from '../../images/ear.svg';
import ProgressBar from '../UI/ProgressBar/ProgressBar';

const wordIteratorStore = new WordIteratorStore();
const wordListenStore = new WordListenStore();

function Game6() {
  const { t } = useTranslation();
  const { wordStore, gameStore, modalStore } = useStores();

  function yesButtonHandler() {
    if (wordListenStore.isCorrect) {
      gameStore.setCorrect();
      wordIteratorStore.nextWord();
    } else {
      gameStore.setWrong();
      wordIteratorStore.nextWord();
    }
  }

  function noButtonHandler() {
    if (!wordListenStore.isCorrect) {
      gameStore.setCorrect();
      wordIteratorStore.nextWord();
    } else {
      gameStore.setWrong();
      wordIteratorStore.nextWord();
    }
  }

  function sayButtonHandler() {
    wordListenStore.sayWord();
  }

  function skipButtonHandler() {
    wordIteratorStore.nextWord();
  }

  useEffect(() => {
    if (!wordStore.isLoading) {
      wordIteratorStore.setWords(wordStore.words);
      wordListenStore.setWords(wordStore.words);
      wordListenStore.setQuestion(wordIteratorStore.current);
      gameStore.setTotal(wordStore.words.length);
      gameStore.iterator = wordIteratorStore;
    }
  }, [wordStore.isLoading]);

  useEffect(() => {
    if (!wordStore.isLoading && wordIteratorStore.current !== undefined) {
      wordListenStore.setWords(wordStore.words);
      wordListenStore.setQuestion(wordIteratorStore.current);
    }
  }, [wordIteratorStore.current]);

  useEffect(() => {
    if (wordIteratorStore.isEnd) {
      modalStore.openModal(<GameEndMessage />);
    }
  }, [wordIteratorStore.isEnd]);

  return (
    <main className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && wordStore.words.length > 0 && <ProgressBar value={wordIteratorStore.setProgress()} />}
      {!wordStore.isLoading && (
        <>
          <span className="game__word-label">{t('It translates as')}</span>
          <h2 className="game__word">{wordIteratorStore.current.word}</h2>
          <div className="game__group-controls">
            <img src={EarSvg} onClick={sayButtonHandler} className="game__img-hear" alt="Ear" />
          </div>
          <div className="game__group-controls">
            <Button onClick={yesButtonHandler}>
              <>{t('Yes')}</>
            </Button>
            <Button className="button_red" onClick={noButtonHandler}>
              <>{t('No')}</>
            </Button>
          </div>
          <div className="game__group-controls">
            <Button className="button_red" onClick={skipButtonHandler}>
              <>{t('Skip it')}</>
            </Button>
          </div>
        </>
      )}
    </main>
  );
}

export default observer(Game6);
