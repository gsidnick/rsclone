import React from 'react';
import Button from '../UI/Button/Button';
import { useTranslation } from 'react-i18next';
import './Home.css';

function Home() {
  const { t } = useTranslation();
  return (
    <main className="home">
      <div className="home__container container">
        <div className="home__greeting">
          <h1 className="home__greeting-text">{t(`Hey, friend, let's start our journey!`)}</h1>
          <span className="home__greeting-description">
            {t('Discover new opportunities for communication, career and travel')}
          </span>
          <div className="home__group-controls">
            <Button className="home__game-play" to="/login">
              <span>{t('Log In')}</span>
            </Button>
            <Button className="home__game-play button_outline" to="/signup">
              <span>{t('Sign Up')}</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
