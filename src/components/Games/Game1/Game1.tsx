import './Game1.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import useStores from '../../../hooks/useStores';
import WordIteratorStore from '../../../store/WordIteratorStore';
import WordSpeechStore from '../../../store/WordSpeechStore';
import { useTranslation } from 'react-i18next';

const wordIteratorStore = new WordIteratorStore();
const wordSpeechStore = new WordSpeechStore();

function Game1() {
  const { t } = useTranslation();
  const { wordStore, gameStore } = useStores();

  useEffect(() => {
    if (wordStore.isLoading === false) {
      wordIteratorStore.setWords(wordStore.words);
      wordSpeechStore.setWord(wordIteratorStore.current.translation);
    }
  }, [wordStore.isLoading]);

  useEffect(() => {
    if (wordSpeechStore.answer !== null) {
      const compareResult = wordSpeechStore.compareWords();
      if (compareResult === true) {
        gameStore.setCorrect();
        gameStore.setIncrementPoints();
        wordSpeechStore.cleanAnswer();
        wordIteratorStore.nextWord();
      } else {
        gameStore.setWrong();
        gameStore.setDecrementPoints();
        wordSpeechStore.cleanAnswer();
        wordIteratorStore.nextWord();
      }
    }
  }, [wordSpeechStore.answer]);

  useEffect(() => {
    if (wordIteratorStore.current !== undefined && wordStore.isLoading === false) {
      wordSpeechStore.setWord(wordIteratorStore.current.translation);
    }
  }, [wordIteratorStore.current]);

  return (
    <div className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && (
        <>
          {wordSpeechStore.setQuestion(wordIteratorStore.current.word)}
          <span className="game__word-label">{t('Say this word')}</span>
          <h2 className="game__word-question">{wordSpeechStore.question}</h2>
          <h2 className="game__word-answer">{wordSpeechStore.answer}</h2>
          <div className="game__group-controls">
            <Button onClick={() => wordSpeechStore.recognizeSpeech()} disabled={wordSpeechStore.isSpeeching}>
              {wordSpeechStore.isSpeeching ? <>{t('Speak now...')}</> : <>{t('Start Speaking')}</>}
            </Button>
            <Button
              className={wordSpeechStore.isSpeeching ? 'button_disabled' : 'button_red'}
              onClick={() => wordIteratorStore.nextWord()}
              disabled={wordSpeechStore.isSpeeching}
            >
              <>{t('Skit it')}</>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(Game1);
