import './Game.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import useStores from '../../hooks/useStores';
import WordTranslationRuStore from '../../store/WordTranslationRuStore';
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

  function skipButtonHandler() {
    updateWords();
  }

  function wordButtonHandler(element: React.MouseEvent<HTMLElement>) {
    if ((element.target as HTMLElement).innerHTML === wordTranslationRuStore.current.word) {
      updateWords();
      gameStore.setCorrect();
      gameStore.setIncrementPoints();
    } else {
      skipButtonHandler();
      gameStore.setWrong();
      gameStore.setDecrementPoints();
    }
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
          <span className="game__word-label">{t('Select the correct translation')}</span>
          <h2 className="game__word">{wordTranslationRuStore.current.translation}</h2>
          <div className="game__group-controls">
            {wordTranslationRuStore.answersArr.map((item, index) => {
              return (
                <Button className="game__button" onClick={wordButtonHandler} key={index}>
                  {item as string}
                </Button>
              );
            })}
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

export default observer(Game5);
