import './Learn.css';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../UI/ProgressBar/ProgressBar';
import Loader from '../UI/Loader/Loader';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import WordIteratorStore from '../../store/WordIteratorStore';
import React, { useEffect } from 'react';

const wordIteratorStore = new WordIteratorStore();

function Learn() {
  const { t } = useTranslation();
  const { wordStore } = useStores();
  useEffect(() => {
    if (!wordStore.isLoading) wordIteratorStore.setWords(wordStore.words);
  }, [wordStore.isLoading, wordIteratorStore]);

  function learnKeyDownHandler(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') wordIteratorStore.nextWord();
    if (event.key === 'ArrowLeft') wordIteratorStore.prevWord();
  }

  return (
    <main className="learn" tabIndex={0} onKeyDown={learnKeyDownHandler}>
      {!wordStore.isLoading && wordStore.words.length > 0 && <ProgressBar value={wordIteratorStore.setProgress()} />}
      <div className="learn__container container">
        <div className="learn__content">
          {wordStore.isLoading && <Loader />}
          {!wordStore.isLoading && wordStore.words.length === 0 && (
            <>
              <h1>{t("You don't have the words to study yet")}</h1>
              <Button to="/library">
                <>{t('Go Library')}</>
              </Button>
            </>
          )}
          {!wordStore.isLoading && wordStore.words.length > 0 && (
            <>
              <div className="learn__wrapper">
                <span className="learn__word-learn">{wordIteratorStore.current?.learn}%</span>
                <span className="learn__word-from">{wordIteratorStore.current?.word}</span>
                <span className="learn__word-to">{wordIteratorStore.current?.translation}</span>
              </div>
              <div className="learn__group-controls">
                <Button className="learn__button button_outline" onClick={() => wordIteratorStore.prevWord()}>
                  <>{t('Previous')}</>
                </Button>
                <Button className="learn__button " onClick={() => wordIteratorStore.nextWord()}>
                  <>{t('Next')}</>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default observer(Learn);
