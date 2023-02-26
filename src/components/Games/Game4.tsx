import './Game.css';
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import useStores from '../../hooks/useStores';
import WordIteratorStore from '../../store/WordIteratorStore';
import WordWriteStore from '../../store/WordWriteStore';
import { useTranslation } from 'react-i18next';
import GameEndMessage from '../Messages/GameEndMessage';
import Input from '../UI/Input/Input';

const wordIteratorStore = new WordIteratorStore();
const wordWriteStore = new WordWriteStore();

function Game4() {
  const { t } = useTranslation();
  const placeholder = t('Type word here...');
  const { wordStore, gameStore, modalStore } = useStores();
  const [word, setWord] = useState<string>('');
  const wordInputRef = useRef<HTMLInputElement>(null);

  function compareWords() {
    const value = document.querySelector('input')?.value?.toLowerCase();
    const correct = wordWriteStore.question?.word?.toLowerCase();
    if (value === correct) {
      gameStore.setCorrect();
      wordIteratorStore.nextWord();
      wordWriteStore.setQuestion(wordIteratorStore.current);
    } else {
      gameStore.setWrong();
      wordIteratorStore.nextWord();
      wordWriteStore.setQuestion(wordIteratorStore.current);
    }
    setWord('');
  }

  function wordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setWord(event.target.value);
  }

  function wordKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      compareWords();
      const target = event.target as HTMLInputElement;
      target.focus();
    }
    if (event.key === 'Escape') {
      gameStore.setWrong();
      wordIteratorStore.nextWord();
      setWord('');
    }
  }

  function okButtonHandler() {
    compareWords();
    wordInputRef.current?.focus();
  }

  function skipButtonHandler() {
    wordIteratorStore.nextWord();
    wordInputRef.current?.focus();
  }

  useEffect(() => {
    if (!wordStore.isLoading) {
      wordIteratorStore.setWords(wordStore.words);
      wordWriteStore.setWords(wordStore.words);
      wordWriteStore.setQuestion(wordIteratorStore.current);
      gameStore.setTotal(wordStore.words.length);
      gameStore.iterator = wordIteratorStore;
      wordInputRef.current?.focus();
    }
  }, [wordStore.isLoading]);

  useEffect(() => {
    if (!wordStore.isLoading && wordIteratorStore.current !== undefined) {
      wordWriteStore.setWords(wordStore.words);
      wordWriteStore.setQuestion(wordIteratorStore.current);
    }
  }, [wordIteratorStore.current]);

  useEffect(() => {
    if (wordIteratorStore.isEnd) {
      wordInputRef.current?.blur();
      modalStore.openModal(<GameEndMessage />);
    }
  }, [wordIteratorStore.isEnd]);

  return (
    <main className="game">
      {wordStore.isLoading && <Loader />}
      {!wordStore.isLoading && (
        <>
          <span className="game__word-label">{t('Write a translation for this word')}</span>
          <h2 className="game__word">{wordIteratorStore.current.translation}</h2>
          <div className="game__group-controls">
            <div className="game__input-control">
              <Input
                name="word"
                type="text"
                ref={wordInputRef}
                placeholder={placeholder}
                value={word}
                onChange={wordChangeHandler}
                onKeyDown={wordKeyDownHandler}
              />
              <Button onClick={okButtonHandler}>
                <>{t('Ok')}</>
              </Button>
            </div>
          </div>
          <div className="game__group-controls">
            <Button onClick={skipButtonHandler} className="button_red">
              <>{t('Skip it')}</>
            </Button>
          </div>
        </>
      )}
    </main>
  );
}

export default observer(Game4);
