/* eslint-disable react-hooks/exhaustive-deps */
import './Game3.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import useStores from '../../../hooks/useStores';
import WordTranslationEnStore from '../../../store/WordTranslationEnStore';
import { useTranslation } from 'react-i18next';
import GameMessage from '../GameMessage/GameMessage';

const wordTranslationEnStore = new WordTranslationEnStore();

function Game3() {
  const { t } = useTranslation();

  const { wordStore, gameStore } = useStores();

  function updateWords() {
    wordTranslationEnStore.nextWord();
    wordTranslationEnStore.setWords(wordStore.words);
    wordTranslationEnStore.randomAnswers();
  }

  function skipWord() {
    updateWords();
  }

  function isCorrect(element: React.MouseEvent<HTMLElement>) {
    if ((element.target as HTMLElement).innerHTML === wordTranslationEnStore.current.translation) {
      updateWords();
      gameStore.setCorrect();
      gameStore.setIncrementPoints();
    } else {
      skipWord();
      gameStore.setWrong();
      gameStore.setDecrementPoints();
    }
  }

  useEffect(() => {
    if (wordStore.isLoading === false) {
      wordTranslationEnStore.setWords(wordStore.words);
      wordTranslationEnStore.setQuestion(wordTranslationEnStore.current);
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
              <span className="game__main-traslation">{wordTranslationEnStore.current.word}</span>
            </h3>
            <div className="game__listen-container">
              <Button className="game__btn-next button_red" onClick={skipWord}>
                <>{t('Next word')}</>
              </Button>
            </div>
            <div className="game__answer-container">
              {wordTranslationEnStore.answersArr.map((item, index) => {
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

export default observer(Game3);
