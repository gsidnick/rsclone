import './Library.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import Loader from '../UI/Loader/Loader';

function Library() {
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
        {wordStore.isLoading && <Loader />}
        {!wordStore.isLoading && (
          <>
            <div className="library__group-controls">
              <Input
                name="word"
                type="text"
                placeholder="Type new word here..."
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
              <Button className="" onClick={() => wordStore.addWord(word)}>
                Add
              </Button>
            </div>
            <div className="library__list">
              <div className="library__row-head">
                <div className="library__col">Word</div>
                <div className="library__col">Translation</div>
                <div className="library__col">Learn</div>
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
