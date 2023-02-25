import './Game.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import useStores from '../../hooks/useStores';
import WordIteratorStore from '../../store/WordIteratorStore';
import WordWriteStore from '../../store/WordWriteStore';
import { useTranslation } from 'react-i18next';

const wordIteratorStore = new WordIteratorStore();
const wordWriteStore = new WordWriteStore();

function Game4() {
  const { t } = useTranslation();

  const { wordStore, gameStore } = useStores();
  wordIteratorStore.setWords(wordStore.words);
  wordWriteStore.setWords(wordStore.words);

  function CheckAnswer() {
    const value = document.querySelector('input')?.value?.toLowerCase();
    const correct = wordWriteStore.question?.word?.toLowerCase();
    if (value === correct) {
      wordIteratorStore.nextWord();
      gameStore.setCorrect();
      gameStore.setIncrementPoints();
    } else {
      wordIteratorStore.nextWord();
      gameStore.setWrong();
      gameStore.setDecrementPoints();
    }
  }

  function skipWord() {
    wordIteratorStore.nextWord();
  }

  return (
    <main className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && (
        <>
          {wordWriteStore.setQuestion(wordIteratorStore.current)}
          <span className="game__word-label">{t('Write a translation for this word')}</span>
          <h2 className="game__word">{wordWriteStore.question?.translation}</h2>
          <div className="game__group-controls">
            <div className="game__input-control">
              <input className="game__input-rounded" name="answer" type="text"></input>
              <Button className="game__btn-rounded" onClick={() => CheckAnswer()}>
                <>{t('Ok')}</>
              </Button>
            </div>
          </div>
          <div className="game__group-controls">
            <Button onClick={() => skipWord()} className="button_red">
              <>{t('Skip it')}</>
            </Button>
          </div>
        </>
      )}
    </main>
  );
}

export default observer(Game4);
