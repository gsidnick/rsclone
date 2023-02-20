/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './Game3.css';
import React from 'react';
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

  function checkYes() {
    let flag = wordListenStore.isCorrect;
    if (flag === true) {
      gameStore.setCorrect();
      wordIteratorStore.nextWord();
    } else {
      gameStore.setWrong();
      wordIteratorStore.nextWord();
    }
  }

  function checkNo() {
    let flag = wordListenStore.isCorrect;
    if (flag === false) {
      gameStore.setCorrect();
      wordIteratorStore.nextWord();
    } else {
      gameStore.setWrong();
      wordIteratorStore.nextWord();
    }
  }

  function skipWord() {
    wordIteratorStore.nextWord();
    gameStore.setWrong();
  }

  return (
    <main className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && (
        <>
          {wordListenStore.setQuestion(wordIteratorStore.current)}
          {wordListenStore.randomWord()}
          <div className="game__container container">
            <h3 className="game__word">
              {t('It translates as')} <span className="game__main-traslation">{wordListenStore.question?.word}</span> ?
            </h3>
            <div className="game__listen-container">
              <img src={EarSvg} onClick={() => wordListenStore.wiretap()} className="game__img-hear" alt="Ear" />
              <Button className="game__btn-next" onClick={() => skipWord()}>
                <>{t('Next word')}</>
              </Button>
            </div>
            <div className="game__answer-container">
              <Button onClick={checkYes}>
                <>{t('Yes')}</>
              </Button>
              <Button className="button_red" onClick={checkNo}>
                <>{t('No')}</>
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default observer(Game3);
