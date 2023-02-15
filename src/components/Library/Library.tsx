import './Library.css';
import React, { useContext, useState } from 'react';
import IAppContext from '../../interfaces/IAppContext';
import { AppContext } from '../../';
import { observer } from 'mobx-react-lite';

function Library() {
  const { wordStore } = useContext<IAppContext>(AppContext);
  const [word, setWord] = useState<string>('');

  function renderRows() {
    return wordStore.words.map((item, index) => {
      return (
        <div key={index} className="library__item">
          <div className="library__col">{item.word}</div>
          <div className="library__col">{item.translation}</div>
          <div className="library__col">{item.learn}%</div>
          <button className="library__btn-remove" onClick={() => wordStore.removeWord(item._id)}></button>
        </div>
      );
    });
  }

  return (
    <main className="library">
      <div className="library__container container bordered">
        <h2 className="library__title">
          Add new <span className="library__title_span">Word</span>
        </h2>
        <form className="library__form">
          <input className="library__input-text" name="word" type="text" onChange={(e) => setWord(e.target.value)} />
          <button className="library__button-add" type="button" onClick={() => wordStore.addWord(word)}>
            +
          </button>
        </form>
        <div className="library__list">
          <div className="library__row-head">
            <div className="library__col">Word</div>
            <div className="library__col">Translation</div>
            <div className="library__col">Learn</div>
          </div>
          <div className="library__row-body">{renderRows()}</div>
        </div>
      </div>
    </main>
  );
}

export default observer(Library);
