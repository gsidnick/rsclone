/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, SetStateAction } from 'react';
import IWord from './interfaces/IWord';
import IMainContext from './interfaces/IMainContext';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Library from './components/Library/Library';
import Learn from './components/Learn/Learn';
import Footer from './components/Footer/Footer';
import GamePage from './components/GamePage/GamePage';
import AuthLogin from './components/Auth/AuthLogin';
import AuthSignup from './components/Auth/AuthSignup';
import './App.css';
import GameCards from './components/GameCards/GameCards';
import { gamesLib } from './constants';

export const MainContext = React.createContext<IMainContext>({ 
  library:[],
  setLibrary:() => {},
  gamesLib:[],
  points:0,
  setPoints:() => {},
});

function App() {
  const [library, setLibrary] = useState<IWord[]>([]);
  const [points, setPoints] = useState(0);

  async function getDataWords() {
    const URL = 'http://localhost:7000';
    try {
      const data = await fetch(`${URL}/api/words`);
      return await data.json();
    } catch(e) {
      console.error(e)
    }
  }

  function setStorage() {
    const libraryTmp = library;
    const listLibraryTmp = JSON.stringify(libraryTmp);
    if (!listLibraryTmp) return;

    window.localStorage.setItem('library', listLibraryTmp);
  }

   function getStoragePoints(): string | null | undefined | SetStateAction<number> {
    const pointsTmp = localStorage.getItem('points');
    if (isNaN(points)) return;

    return pointsTmp;
  }

  function getStorage() {
    const libraryTmp = localStorage.getItem('library');
    if (!libraryTmp) return;

    const listLibraryTmp = JSON.parse(libraryTmp);
    if (!listLibraryTmp) return;

    return listLibraryTmp;
  }

  const setUseState = async () => {
    const libraryTmp = await getDataWords();
    setLibrary([...libraryTmp])
  };

  useEffect(() => {
    if(!library || library.length === 0) {

      const libraryLocal = getStorage();

      if (libraryLocal && libraryLocal.length > 0){
        setLibrary([...libraryLocal]);
        setPoints((getStoragePoints()) as number);
      }
   setUseState();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[library])

  useEffect(() => {
    setStorage();
  },[points]);

  return (
    <div className="App">
      <Router>
        <Header />
        <MainContext.Provider value={{ library, setLibrary, gamesLib, points, setPoints}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/library/' element={<Library />} />
          <Route path='/learn/' element={<Learn />} />
          <Route path='/games/' element={<GameCards />} />
          <Route path='/games/:number/' element={<GamePage />}/>
          <Route path="/login/" element={<AuthLogin />} />
            <Route path="/signup/" element={<AuthSignup />} />
        </Routes>
        </MainContext.Provider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
