import { useRef, useState } from 'react';
import './Library.css';

function Library() {
  const [library, setLibrary] = useState([
    { word: 'Стол', translate: 'Table', learn: '80' },
    { word: 'Собака', translate: 'Dog', learn: '30' },
    { word: 'Стул', translate: 'Chair', learn: '0' }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  function add() {
    const inputElem = inputRef.current;
    if (!inputElem) return;

    const word = inputElem.value;
    if (!word) return;

    const libraryTmp = library;
    libraryTmp.push({ word: word, translate: word, learn: word });

    setLibrary([...libraryTmp]);
  }

  function get() {
    return library.map((item, index) => {
      return (
        <div key={index} className="library__item">
          <div className="library__col">{item.word}</div>
          <div className="library__col">{item.translate}</div>
          <div className="library__col">{item.learn}%</div>
          <button className="library__btn-remove">-</button>
        </div>
      )
    })
  }

  return (
    <main className="library">
      <div className="library__container bordered">
        <h2 className="library__title">Add new <span className="library__title_span">Word</span></h2>
        <div className="library__form">
          <input ref={inputRef} className="library__form_input-text" type="text" /> 
          <button onClick={add} className="library__form_input-add">+</button>
        </div>
        <div className="library__list">
          <div className="library__row head">
            <div className="library__col">Word</div>
            <div className="library__col">Translation</div>
            <div className="library__col">Learn</div>
          </div>
          <div className="library__row body active">{get()}</div>
        </div>
      </div>
    </main>
  );
}

export default Library;
