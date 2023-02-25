import './Game.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import useStores from '../../hooks/useStores';
import WordTranslationEnStore from '../../store/WordTranslationEnStore';
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

  function skipButtonHandler() {
    updateWords();
  }

  function wordButtonHandler(element: React.MouseEvent<HTMLElement>) {
    if ((element.target as HTMLElement).innerHTML === wordTranslationEnStore.current.translation) {
      updateWords();
      gameStore.setCorrect();
    } else {
      updateWords();
      gameStore.setWrong();
    }
  }

  useEffect(() => {
    if (!wordStore.isLoading) {
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
          <span className="game__word-label">{t('Select the correct translation')}</span>
          <h2 className="game__word">{wordTranslationEnStore.current.word}</h2>
          <div className="game__group-controls">
            {wordTranslationEnStore.answersArr.map((item, index) => {
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

export default observer(Game3);
