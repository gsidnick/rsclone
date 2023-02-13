import { useRef, useContext, FormEvent } from 'react';
import './Library.css';
import { AppContext } from '../../App';

function Library() {
  const { library, setLibrary } = useContext(AppContext);

  const inputRef = useRef<HTMLInputElement>(null);

  function dublicate(word: string) {
    const wordDublicate = library.find(item => word === item.word);
    if (wordDublicate) return true;
    
    return false;
  }

  async function add() {
    try {
      const inputElem = inputRef.current as HTMLInputElement | null;
  
      let word = '';
      if (inputElem) word = inputElem.value.toLowerCase();
      if (word?.length === 0) return;
      
      let libraryTmp = library;
  
      if (dublicate(word)) {
        if (inputElem) inputElem.value = '';
        return;
      }

      const URL = 'http://localhost:4100/api/word/';
      const response = await fetch (URL, { 
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, translation: word, learn: 0 }),
      });
      const data = await response.json();
      libraryTmp.push(data);
  
      setLibrary([...libraryTmp]);

      if (inputElem) inputElem.value = '';
    } catch (e) {
      console.error(e);
    }
  }

  async function remove(wordIndex: number) {
    try {
      const URL = `http://localhost:4100/api/word/${wordIndex}`;
      await fetch (URL, { method: "DELETE" });
      let libraryTmp = library;
      libraryTmp = libraryTmp.filter((item) => {
        return wordIndex !== item.id;
      })
  
      setLibrary([...libraryTmp]);
    } catch (e) {
      console.error(e);
    }
  }

  function formHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    add();
  }

  function get() {
    return library.map((item, index) => {
      return (
        <div key={index} className="library__item">
          <div className="library__col">{item.word}</div>
          <div className="library__col">{item.translation}</div>
          <div className="library__col">{item.learn}%</div>
          <button className="library__btn-remove" onClick={() => { remove(item.id) }}></button>
        </div>
      )
    })
  }

  return (
    <main className="library">
      <div className="library__container container bordered">
        <h2 className="library__title">Add new <span className="library__title_span">Word</span></h2>
        <form className="library__form" onSubmit={formHandler}>
          <input className="library__input-text" ref={inputRef} name="word" type="text" /> 
          <button className="library__button-add">+</button>
        </form>
        <div className="library__list">
          <div className="library__row-head">
            <div className="library__col">Word</div>
            <div className="library__col">Translation</div>
            <div className="library__col">Learn</div>
          </div>
          <div className="library__row-body">{get()}</div>
        </div>
      </div>
    </main>
  );
}

export default Library;
