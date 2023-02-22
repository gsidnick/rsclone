/* eslint-disable react-hooks/exhaustive-deps */
import './Game5.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import useStores from '../../../hooks/useStores';
import WordTranslationRuStore from '../../../store/WordTranslationRuStore';
import { useTranslation } from 'react-i18next';
import GameMessage from '../GameMessage/GameMessage';

const wordTranslationRuStore = new WordTranslationRuStore();

function Game5() {
  const { t } = useTranslation();

  const { wordStore, gameStore } = useStores();

  function updateWords() {
    wordTranslationRuStore.nextWord();
    wordTranslationRuStore.setWords(wordStore.words);
    wordTranslationRuStore.randomAnswers();
  }

  function skipWord() {
    updateWords();
    gameStore.setWrong();
  }

  function isCorrect(element: React.MouseEvent<HTMLElement>) {
    if ((element.target as HTMLElement).innerHTML === wordTranslationRuStore.current.word) {
      updateWords();
      gameStore.setCorrect();
    } else skipWord();
  }

  useEffect(() => {
    if (wordStore.isLoading === false) {
      wordTranslationRuStore.setWords(wordStore.words);
      wordTranslationRuStore.setQuestion(wordTranslationRuStore.current);
    }
  }, [wordStore.isLoading]);

  return (
    <main className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && wordStore.words.length < 3 && <GameMessage />}
      {!wordStore.isLoading && wordStore.words.length >= 3 && (
        <>
          <div className="game__container container">
            <h3 className="game__word">
              {t('Select the correct translation')}{' '}
              <span className="game__main-traslation">{wordTranslationRuStore.current.translation}</span>
            </h3>
            <div className="game__listen-container">
              <Button className="game__btn-next button_red" onClick={skipWord}>
                <>{t('Next word')}</>
              </Button>
            </div>
            <div className="game__answer-container">
              {wordTranslationRuStore.answersArr.map((item, index) => {
                return (
                  <Button onClick={isCorrect} key={index}>
                    {item as string}
                  </Button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default observer(Game5);
