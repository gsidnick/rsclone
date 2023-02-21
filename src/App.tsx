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
import Modal from './components/Modal/Modal';
import OverlayLoader from './components/UI/OverlayLoader/OverlayLoader';
import Statistic from './components/Statistic/Statistic';

function App() {
  const { authStore, statisticStore, wordStore, modalStore } = useStores();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      if (authStore.isAuth === false) {
        authStore
          .verifyAuth()
          .then(() => {
            statisticStore.fetchStatistic();
            wordStore.fetchWords();
          })
          .catch((error) => console.error(error));
      }
    }
  }, [authStore.isAuth]);

  return (
    <div className="App">
      {authStore.isLoading && <OverlayLoader />}
      {!authStore.isLoading && (
        <>
          <Router>
            <Header />
            <Routes>
              {!authStore.isAuth && (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/login/" element={<AuthLogin />} />
                  <Route path="/signup/" element={<AuthSignup />} />
                </>
              )}
              {authStore.isAuth && (
                <>
                  <Route path="/" element={<Statistic />} />
                  <Route path="/library/" element={<Library />} />
                  <Route path="/learn/" element={<Learn />} />
                  <Route path="/games/" element={<GameCards />} />
                  <Route path="/games/:id" element={<GamePage />} />
                  <Route path="/logout/" element={<AuthLogin />} />
                </>
              )}
            </Routes>
            <Footer />
          </Router>
        </>
      )}
      <Modal className={modalStore.isModal ? 'modal_open' : ''} />
    </div>
  );
}

export default observer(App);
