import './Library.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';

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
  }

  return (
    <main className="library">
      <div className="library__container container">
        <div className="library__group-controls">
          <Input
            name="word"
            type="text"
            placeholder= {placeholder}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <Button className="" onClick={() => wordStore.addWord(word)}>
            <span>{t('Add')}</span>
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
      </div>
    </main>
  );
}

export default observer(Library);
