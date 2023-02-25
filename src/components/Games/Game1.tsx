import './Game.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import useStores from '../../hooks/useStores';
import WordIteratorStore from '../../store/WordIteratorStore';
import WordSpeechStore from '../../store/WordSpeechStore';
import { useTranslation } from 'react-i18next';
import GameEndMessage from '../Messages/GameEndMessage';

const wordIteratorStore = new WordIteratorStore();
const wordSpeechStore = new WordSpeechStore();

function Game1() {
  const { t } = useTranslation();
  const { wordStore, gameStore, modalStore } = useStores();

  function nextQuestion() {
    setTimeout(() => {
      wordSpeechStore.resetAnswer();
      wordIteratorStore.nextWord();
    }, 1000);
  }

  function speechButtonHandler() {
    wordSpeechStore.recognizeSpeech();
  }

  function skipButtonHandler() {
    gameStore.setWrong();
    wordIteratorStore.nextWord();
  }

  useEffect(() => {
    if (!wordStore.isLoading) {
      wordIteratorStore.setWords(wordStore.words);
      gameStore.setTotal(wordStore.words.length);
      gameStore.iterator = wordIteratorStore;
      wordSpeechStore.setWord(wordIteratorStore.current.translation);
    }
  }, [wordStore.isLoading]);

  useEffect(() => {
    if (!wordStore.isLoading && wordIteratorStore.current !== undefined) {
      wordSpeechStore.setWord(wordIteratorStore.current.translation);
      wordSpeechStore.setQuestion(wordIteratorStore.current.word);
    }
  }, [wordIteratorStore.current]);

  useEffect(() => {
    if (wordIteratorStore.isEnd) {
      modalStore.openModal(<GameEndMessage />);
    }
  }, [wordIteratorStore.isEnd]);

  useEffect(() => {
    if (wordSpeechStore.answer !== null) {
      const compareResult = wordSpeechStore.compareWords();
      if (compareResult === true) {
        gameStore.setCorrect();
        nextQuestion();
      } else {
        gameStore.setWrong();
        nextQuestion();
      }
    }
  }, [wordSpeechStore.answer]);

  return (
    <div className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && (
        <>
          <span className="game__word-label">{t('Say this word')}</span>
          <h2 className="game__word">{wordSpeechStore.question}</h2>
          <h2 className="game__word">{wordSpeechStore.answer}</h2>
          <div className="game__group-controls">
            <Button
              className={wordSpeechStore.isSpeeching || wordSpeechStore.isSaid ? 'button_disabled' : ''}
              disabled={wordSpeechStore.isSpeeching || wordSpeechStore.isSaid}
              onClick={speechButtonHandler}
            >
              <>
                {!wordSpeechStore.isSpeeching && !wordSpeechStore.isSaid && <>{t('Start Speaking')}</>}
                {wordSpeechStore.isSpeeching && !wordSpeechStore.isSaid && <>{t('Speak now...')}</>}
                {wordSpeechStore.isSpeeching && wordSpeechStore.isSaid && <>{t('Wait...')}</>}
                {!wordSpeechStore.isSpeeching && wordSpeechStore.isSaid && <>{t('Wait...')}</>}
              </>
            </Button>
            <Button
              className={wordSpeechStore.isSpeeching || wordSpeechStore.isSaid ? 'button_disabled' : 'button_red'}
              disabled={wordSpeechStore.isSpeeching || wordSpeechStore.isSaid}
              onClick={skipButtonHandler}
            >
              <>{t('Skip it')}</>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(Game1);
