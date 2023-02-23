/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import AuthLogin from './components/Auth/AuthLogin';
import Library from './components/Library/Library';
import Learn from './components/Learn/Learn';
import GameCards from './components/GameCards/GameCards';
import GamePage from './components/GamePage/GamePage';
import useStores from './hooks/useStores';
import Modal from './components/Modal/Modal';
import OverlayLoader from './components/UI/OverlayLoader/OverlayLoader';
import Page404 from './components/Page404/Page404';

function App() {
  const { authStore, wordStore, modalStore } = useStores();

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
    <>
      {authStore.isLoading && <OverlayLoader />}
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
              <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
          </Router>
        </>
      )}
      <Modal className={modalStore.isModal ? 'modal_open' : ''} />
    </>
  );
}

export default observer(App);
