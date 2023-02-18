import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import AuthLogin from './components/Auth/AuthLogin';
import AuthSignup from './components/Auth/AuthSignup';
import Library from './components/Library/Library';
import Learn from './components/Learn/Learn';
import GameCards from './components/GameCards/GameCards';
import GamePage from './components/GamePage/GamePage';
import useStores from './hooks/useStores';

function App() {
  const { authStore } = useStores();

  useEffect(() => {
    console.log(localStorage.getItem('accessToken'));
    if (localStorage.getItem('accessToken')) {
      authStore.verifyAuth();
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {authStore.isAuth && (
            <>
              <Route path="/library/" element={<Library />} />
              <Route path="/learn/" element={<Learn />} />
              <Route path="/games/" element={<GameCards />} />
              <Route path="/games/:id" element={<GamePage />} />
              <Route path="/logout/" element={<AuthLogin />} />
            </>
          )}
          <Route path="/login/" element={<AuthLogin />} />
          <Route path="/signup/" element={<AuthSignup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default observer(App);
