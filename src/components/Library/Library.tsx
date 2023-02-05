import { useRef, useState } from 'react';
import ILibrary from '../../interfaces/ILibrary';
import './Library.css';

function Library() {
  function getStorage() {
    const libraryTmp = localStorage.getItem('library');
    if (!libraryTmp) return;

    const listLibraryTmp = JSON.parse(libraryTmp);
    if (!listLibraryTmp) return;

    return listLibraryTmp;
  }

  const [library, setLibrary] = useState<ILibrary[]>(getStorage());
  const inputRef = useRef<HTMLInputElement>(null);

  function setStorage() {
    const libraryTmp = library;
    const listLibraryTmp = JSON.stringify(libraryTmp);
    if (!listLibraryTmp) return;

    window.localStorage.setItem('library', listLibraryTmp);
  }

  function dublicate(word: string) {
    const wordDublicate = library.find(item => word === item.word);
    if (wordDublicate) return true;
    
    return false;
  }

  function add() {
    const inputElem = inputRef.current;
    if (!inputElem) return;

    const word = inputElem.value.toLowerCase();
    if (!word) return;

    if (dublicate(word)) return;

    const libraryTmp = library;
    libraryTmp.push({ word: word, translate: word, learn: '0' });
  
    setLibrary([...libraryTmp]);

    inputElem.value = '';
  }

  function remove(wordIndex: number) {
    let libraryTmp = library;
    libraryTmp = libraryTmp.filter((item, index) => {
      return wordIndex != index;
    })
  
    setLibrary([...libraryTmp]);
  }

  function get() {
    setStorage()
    return library.map((item, index) => {
      return (
        <div key={index} className="library__item">
          <div className="library__col">{item.word}</div>
          <div className="library__col">{item.translate}</div>
          <div className="library__col">{item.learn}%</div>
          <button onClick={() => { remove(index) }} className="library__btn-remove">-</button>
        </div>
      )
    })
  }

  return (
    <main className="library">
      <div className="library__container bordered">
        <h2 className="library__title">Add new <span className="library__title_span">Word</span></h2>
        <form className="library__form">
          <input ref={inputRef} className="library__input-text" type="text" /> 
          <button onClick={add} className="library__button-add">+</button>
        </form>
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
