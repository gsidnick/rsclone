import './Home.css';
import React, { useEffect } from 'react';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import AuthLogin from '../Auth/AuthLogin';
import AuthSignup from '../Auth/AuthSignup';
import cover from '../../images/cover.svg';

function Home() {
  const { modalStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);

  function openLoginForm() {
    modalStore.openModal(<AuthLogin />);
  }

  function openSignupForm() {
    modalStore.openModal(<AuthSignup />);
  }

  return (
    <>
      <main className="home">
        <div className="home__container container">
          <div className="home__cover">
            <img className="home__cover-image" src={cover} alt="cover" />
          </div>
          <div className="home__greeting">
            <h1 className="home__greeting-text">{t(`Hey, friend, let's start our journey!`)}</h1>
            <span className="home__greeting-description">
              {t('Discover new opportunities for communication, career and travel')}
            </span>
            <div className="home__group-controls">
              <Button className="home__game-play" onClick={openLoginForm}>
                <>{t('Log In')}</>
              </Button>
              <Button className="home__game-play button_outline" onClick={openSignupForm}>
                <>{t('Sign Up')}</>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default observer(Home);
