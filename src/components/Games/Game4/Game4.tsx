import './Game4.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import useStores from '../../../hooks/useStores';
import WordIteratorStore from '../../../store/WordIteratorStore';
import WordWriteStore from '../../../store/WordWriteStore';
import { useTranslation } from 'react-i18next';

const wordIteratorStore = new WordIteratorStore();
const wordWriteStore = new WordWriteStore();

function Game4() {
  const { t } = useTranslation();

  const { wordStore, gameStore } = useStores();
  wordIteratorStore.setWords(wordStore.words);
  wordWriteStore.setWords(wordStore.words);

  function CheckAnswer() {
    const value = (document.querySelector('input')?.value)?.toLowerCase();
    const correct = (wordWriteStore.question?.word)?.toLowerCase();
    if (value === correct) {
      wordIteratorStore.nextWord();
      gameStore.setCorrect();
    } else {
      wordIteratorStore.nextWord();
      gameStore.setWrong();
    }
  };

  return (
    <main className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && (
        <>
          {wordWriteStore.setQuestion(wordIteratorStore.current)}
          <div className="game__container container">
            <h3 className="game__word">
              {t('Write a translation for this word')} <span className="game__main-traslation">{wordWriteStore.question?.translation}</span> ?
            </h3>
            <div className="game__input-container">
              <div className="game__input-submit">
                <input className="game__input-rounded" name='answer' type='text'></input>
                <Button className="game__btn-rounded" onClick={() => CheckAnswer()}>
                  <>{t('Ok')}</>
                </Button>
              </div>
              <Button onClick={() => CheckAnswer()} className="game__btn-next">
                <>{t('Next word')}</>
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default observer(Game4);
