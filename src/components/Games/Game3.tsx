import './Game.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import useStores from '../../hooks/useStores';
import WordTranslationStore from '../../store/WordTranslationStore';
import { useTranslation } from 'react-i18next';
import GameEndMessage from '../Messages/GameEndMessage';
import WordIteratorStore from '../../store/WordIteratorStore';
import ProgressBar from '../UI/ProgressBar/ProgressBar';

const wordIteratorStore = new WordIteratorStore();
const wordTranslationStore = new WordTranslationStore('en');

function Game3() {
  const { t } = useTranslation();
  const { wordStore, gameStore, modalStore } = useStores();

  function skipButtonHandler() {
    wordIteratorStore.nextWord();
    wordTranslationStore.setCorrectAnswer(wordIteratorStore.current);
  }

  function wordButtonHandler(element: React.MouseEvent<HTMLElement>) {
    if ((element.target as HTMLElement).innerHTML === wordIteratorStore.current.translation) {
      wordIteratorStore.nextWord();
      wordTranslationStore.setCorrectAnswer(wordIteratorStore.current);
      gameStore.setCorrect();
    } else {
      wordIteratorStore.nextWord();
      wordTranslationStore.setCorrectAnswer(wordIteratorStore.current);
      gameStore.setWrong();
    }
  }

  useEffect(() => {
    if (!wordStore.isLoading) {
      wordIteratorStore.setWords(wordStore.words);
      wordTranslationStore.setWords(wordStore.words);
      wordTranslationStore.setCorrectAnswer(wordIteratorStore.current);
      gameStore.setTotal(wordStore.words.length);
      gameStore.iterator = wordIteratorStore;
    }
  }, [wordStore.isLoading]);

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
          <span className="game__word-label">{t('Select the correct translation')}</span>
          <h2 className="game__word">{wordIteratorStore.current.word}</h2>
          <div className="game__group-controls">
            {wordTranslationStore.answers.map((item, index) => {
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
