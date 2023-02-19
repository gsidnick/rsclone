import './Game1.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import useStores from '../../../hooks/useStores';
import WordIteratorStore from '../../../store/WordIteratorStore';
import WordSpeechStore from '../../../store/WordSpeechStore';

const wordIteratorStore = new WordIteratorStore();
const wordSpeechStore = new WordSpeechStore();

function Game1() {
  const { wordStore, gameStore } = useStores();
  wordIteratorStore.setWords(wordStore.words);

  useEffect(() => {
    const compareResult = wordSpeechStore.compareWords();
    if (compareResult === true) {
      gameStore.setCorrect();
      wordIteratorStore.nextWord();
    }

    if (compareResult === false) {
      gameStore.setWrong();
      wordIteratorStore.nextWord();
    }
  }, [wordSpeechStore.answer]);

  return (
    <div className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && (
        <>
          {wordSpeechStore.setQuestion(wordIteratorStore.current.word)}
          <span className="game__word-label">Say this word</span>
          <h2 className="game__word-question">{wordSpeechStore.question}</h2>
          <h2 className="game__word-answer">{wordSpeechStore.answer}</h2>
          <div className="game__group-controls">
            <Button onClick={() => wordSpeechStore.recognizeSpeech()} disabled={wordSpeechStore.isSpeeching}>
              {wordSpeechStore.isSpeeching ? 'Speak now...' : 'Start Speaking'}
            </Button>
            <Button
              className={wordSpeechStore.isSpeeching ? 'button_disabled' : 'button_red'}
              onClick={() => wordIteratorStore.nextWord()}
              disabled={wordSpeechStore.isSpeeching}
            >
              Skip It
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(Game1);
