import './Library.css';
import React, { useEffect, useState } from 'react';
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
  };

  useEffect(() => {
    const list = document.querySelector('.library__list');
    
    if(localStorage.getItem('theme') === 'dark') {
        list?.classList.remove('light');
        list?.classList.add('dark');
      } else {
        list?.classList.remove('dark');
        list?.classList.add('light');
      }
  }, []);

  return (
    <main className="library">
      <div className="library__container container">
        {wordStore.isLoading && <Loader />}
        {!wordStore.isLoading && (
          <>
            <div className="library__group-controls">
              <Input
                name="word"
                type="text"
                placeholder= {placeholder}
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
              <Button className="" onClick={() => wordStore.addWord(word)}>
                <>{t('Add')}</>
              </Button>
            </div>
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
