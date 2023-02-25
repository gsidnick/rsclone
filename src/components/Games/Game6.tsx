import './Game.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import useStores from '../../hooks/useStores';
import WordIteratorStore from '../../store/WordIteratorStore';
import WordListenStore from '../../store/WordListenStore';
import EarSvg from '../../images/ear.svg';
import { useTranslation } from 'react-i18next';

const wordIteratorStore = new WordIteratorStore();
const wordListenStore = new WordListenStore();

function Game6() {
  const { t } = useTranslation();

  const { wordStore, gameStore } = useStores();
  wordIteratorStore.setWords(wordStore.words);
  wordListenStore.setWords(wordStore.words);

  function checkYes() {
    let flag = wordListenStore.isCorrect;
    if (flag === true) {
      gameStore.setCorrect();
      gameStore.setIncrementPoints();
      wordIteratorStore.nextWord();
    } else {
      gameStore.setWrong();
      gameStore.setDecrementPoints();
      wordIteratorStore.nextWord();
    }
  }

  function checkNo() {
    let flag = wordListenStore.isCorrect;
    if (flag === false) {
      gameStore.setCorrect();
      gameStore.setIncrementPoints();
      wordIteratorStore.nextWord();
    } else {
      gameStore.setWrong();
      gameStore.setDecrementPoints();
      wordIteratorStore.nextWord();
    }
  }

  function skipButtonHandler() {
    wordIteratorStore.nextWord();
  }

  return (
    <main className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && (
        <>
          {wordListenStore.setQuestion(wordIteratorStore.current)}
          {wordListenStore.randomWord()}
          <span className="game__word-label">{t('It translates as')}</span>
          <h2 className="game__word">{wordListenStore.question?.word}</h2>
          <div className="game__group-controls">
            <img src={EarSvg} onClick={() => wordListenStore.wiretap()} className="game__img-hear" alt="Ear" />
          </div>
          <div className="game__group-controls">
            <Button onClick={checkYes}>
              <>{t('Yes')}</>
            </Button>
            <Button className="button_red" onClick={checkNo}>
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
