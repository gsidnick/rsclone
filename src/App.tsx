import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import IWord from './interfaces/IWord';
import IMainContext from './interfaces/IMainContext';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Library from './components/Library/Library';
import Learn from './components/Learn/Learn';
import Footer from './components/Footer/Footer';
import Games from './components/Games/Games';
import './App.css';

export const MainContext = React.createContext<IMainContext>({ library:[] , setLibrary:() => {} });

function App() {
  const [library, setLibrary] = useState<IWord[]>([]);

  function setStorage() {
    const libraryTmp = library;
    const listLibraryTmp = JSON.stringify(libraryTmp);
    if (!listLibraryTmp) return;

    window.localStorage.setItem('library', listLibraryTmp);
  }

  function getStorage() {
    const libraryTmp = localStorage.getItem('library');
    if (!libraryTmp) return;

    const listLibraryTmp = JSON.parse(libraryTmp);
    if (!listLibraryTmp) return;

    return listLibraryTmp;
  }

  useEffect(() => {
    if(!library || library.length === 0) {
      const libraryLocal = getStorage();

      if (libraryLocal && libraryLocal.length > 0){
        setLibrary([...libraryLocal]);
      }
    } else {
      setStorage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[library])

  return (
    <div className="App">
      <Router>
        <Header />
        <MainContext.Provider value={{ library, setLibrary }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/library/' element={<Library />} />
          <Route path='/learn/' element={<Learn />} />
          <Route path='/games/' element={<Games />} />
        </Routes>
        </MainContext.Provider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
