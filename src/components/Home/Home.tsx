import './Home.css';
import React from 'react';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import ModalAuthLogin from '../Modal/ModalAuthLogin/ModalAuthLogin';

function Home() {
  const { modalStore } = useStores();

  function openLoginForm() {
    modalStore.openModal();
  }

  function openSignupForm() {
    modalStore.openModal();
  }

  return (
    <>
      {modalStore.isModal && <ModalAuthLogin />}
      <main className="home">
        <div className="home__container container">
          <div className="home__greeting">
            <h1 className="home__greeting-text">Hey, friend, let's start our journey!</h1>
            <span className="home__greeting-description">
              Discover new opportunities for communication, career and travel
            </span>
            <div className="home__group-controls">
              <Button className="home__game-play" onClick={openLoginForm}>
                Log In
              </Button>
              <Button className="home__game-play button_outline" onClick={openSignupForm}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default observer(Home);
