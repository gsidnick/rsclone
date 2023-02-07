import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import ILibrary from '../src/interfaces//ILibrary';
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
  const [library, setLibrary] = useState<ILibrary[]>([]);

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
