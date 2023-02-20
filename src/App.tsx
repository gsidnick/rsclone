/* eslint-disable react-hooks/exhaustive-deps */
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
import ModalLoader from './components/Modal/ModalLoader/ModalLoader';

function App() {
  const { authStore, wordStore } = useStores();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      if (authStore.isAuth === false) {
        authStore
          .verifyAuth()
          .then(() => wordStore.fetchWords())
          .catch((error) => console.error(error));
      }
    }
  }, [authStore.isAuth]);

  return (
    <div className="App">
      {authStore.isLoading && <ModalLoader />}
      {!authStore.isLoading && (
        <>
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
        </>
      )}
    </div>
  );
}

export default observer(App);
