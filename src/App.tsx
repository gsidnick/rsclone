import React from 'react';
import Header from './components/Header/Header';
// import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Library from './components/Library/Library';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Library />
      <Footer />
    </div>
  );
}

export default App;
