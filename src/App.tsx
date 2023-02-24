/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useStores from './hooks/useStores';
import TokenService from './services/TokenService';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Library from './components/Library/Library';
import Learn from './components/Learn/Learn';
import GameCards from './components/GameCards/GameCards';
import GamePage from './components/GamePage/GamePage';
import AuthLogin from './components/Auth/AuthLogin';
import Modal from './components/Modal/Modal';
import OverlayLoader from './components/UI/OverlayLoader/OverlayLoader';
import Page404 from './components/Page404/Page404';
import Statistic from './components/Statistic/Statistic';

const tokenService = new TokenService();

function App() {
  const { authStore, statisticStore, wordStore, modalStore } = useStores();

  useEffect(() => {
    if (tokenService.getAccessToken()) {
      if (authStore.isAuth) {
        statisticStore.fetchStatistic().catch((error) => console.error(error));
        wordStore.fetchWords().catch((error) => console.error(error));
      }
      if (!authStore.isAuth) {
        authStore.verifyAuth().catch((error) => console.error(error));
      }
    }
  }, [authStore.isAuth]);

  return (
    <>
      {authStore.isLoading && <OverlayLoader />}
      {!authStore.isLoading && !authStore.isAuth && (
        <>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login/" element={<AuthLogin />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
            <Modal className={modalStore.isModal ? 'modal_open' : ''} />
          </Router>
        </>
      )}
      {!authStore.isLoading && authStore.isAuth && (
        <>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Statistic />} />
              <Route path="/library/" element={<Library />} />
              <Route path="/learn/" element={<Learn />} />
              <Route path="/games/" element={<GameCards />} />
              <Route path="/games/:id" element={<GamePage />} />
              <Route path="/logout/" element={<AuthLogin />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
            <Modal className={modalStore.isModal ? 'modal_open' : ''} />
          </Router>
        </>
      )}
    </>
  );
}

export default observer(App);
