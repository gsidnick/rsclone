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
import AuthLogin from './components/Auth/AuthLogin';
import AuthSignup from './components/Auth/AuthSignup';
import './App.css';

export const MainContext = React.createContext<IMainContext>({ library: [], setLibrary: () => {} });

function App() {
  const [library, setLibrary] = useState<IWord[]>([]);

  async function getDataWords() {
    const URL = 'http://localhost:4100';
    try {
      const data = await fetch(`${URL}/api/words`);
      return await data.json();
    } catch(e) {
      console.error(e)
    }
  }

  const setUseState = async () => {
    const libraryTmp = await getDataWords();
    setLibrary([...libraryTmp])
  };

  useEffect(() => {
    if (!library || library.length === 0) {
      setUseState();
    }
  }, [library])

  return (
    <div className="App">
      <Router>
        <Header />
        <MainContext.Provider value={{ library, setLibrary }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library/" element={<Library />} />
            <Route path="/learn/" element={<Learn />} />
            <Route path="/games/" element={<Games />} />
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
