import { useRef, useContext } from 'react';
import './Library.css';
import { MainContext } from '../../App';

function Library() {
  const { library, setLibrary} = useContext(MainContext);

  const inputRef = useRef<HTMLInputElement>(null);

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
    libraryTmp.push({ word: word, translation : word, learn: 0, id: 0 });
  
    setLibrary([...libraryTmp]);

    inputElem.value = '';
  }

  function clearStorage() {
    localStorage.removeItem('library');
  }

  function remove(wordIndex: number) {
    let libraryTmp = library;
    libraryTmp = libraryTmp.filter((item, index) => {
      return wordIndex !== index;
    })

    if (libraryTmp.length === 0) clearStorage()
  
    setLibrary([...libraryTmp]);
  }

  function get() {
    return library.map((item, index) => {
      return (
        <div key={index} className="library__item">
          <div className="library__col">{item.word}</div>
          <div className="library__col">{item.translation}</div>
          <div className="library__col">{item.learn}%</div>
          <button onClick={() => { remove(index) }} className="library__btn-remove">-</button>
        </div>
      )
    })
  }

  return (
    <main className="library">
      <div className="library__container container">
        <h2 className="library__title">Add new <span className="library__title_span">Word</span></h2>
        <form className="library__form">
          <input ref={inputRef} className="library__input-text" type="text" name="word" /> 
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
