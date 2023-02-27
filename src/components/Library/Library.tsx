import './Library.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import Loader from '../UI/Loader/Loader';
import { useTranslation } from 'react-i18next';

function Library() {
  const { t } = useTranslation();
  const placeholder = t('Type new word here...');

  const { wordStore } = useStores();
  const [word, setWord] = useState<string>('');

  function sendData() {
    wordStore.addWord(word);
    setWord('');
  }

  function wordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setWord(event.target.value);
  }

  function wordKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendData();
      const target = event.target as HTMLInputElement;
      target.focus();
    }
  }

  function addClickHandler() {
    sendData();
  }

  function renderRows() {
    return wordStore.words.map((item, index) => {
      return (
        <div key={index} className="library__item">
          <div className="library__col">{item.word}</div>
          <div className="library__col">{item.translation}</div>
          <div className="library__col">{item.learn}%</div>
          <div className="library__col library__col-controls">
            <Button className="button_small button_red" onClick={() => wordStore.removeWord(item._id)}>
              ✖
            </Button>
          </div>
        </div>
      );
    });
  }

  return (
    <main className="library">
      <div className="library__container container">
        <div className="library__group-controls">
          <div className="library__input-control">
            <Input
              className="input_invalid"
              name="word"
              type="text"
              placeholder={placeholder}
              value={word}
              onChange={wordChangeHandler}
              onKeyDown={wordKeyDownHandler}
            />
            <Button className="" onClick={addClickHandler}>
              <>{t('Add')}</>
            </Button>
          </div>
        </div>
        {wordStore.isLoading && <Loader />}
        {!wordStore.isLoading && wordStore.words.length === 0 && (
          <>
            <h1 className="library__message">Add a few words to start learning them</h1>
          </>
        )}
        {!wordStore.isLoading && wordStore.words.length > 0 && (
          <>
            <div className="library__list">
              <div className="library__row-head">
                <div className="library__col">{t('Word')}</div>
                <div className="library__col">{t('Translation')}</div>
                <div className="library__col">{t('Learn')}</div>
              </div>
              <div className="library__row-body">{renderRows()}</div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default observer(Library);
