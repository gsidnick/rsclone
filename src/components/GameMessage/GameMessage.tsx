import './GameMessage.css';
import React from 'react';
import Button from '../UI/Button/Button';
import { useTranslation } from 'react-i18next';

function GameMessage() {
  const { t } = useTranslation();

  return (
    <main className="gamepage">
      <div className="gamepage__container container">
        <div className="gamepage__message">
          <h1 className="gamepage__message-heading">
            {t('Sorry, you need to add at least 3 words to your library for this game')}
          </h1>
          <Button to="/library">Go Library</Button>
        </div>
      </div>
    </main>
  );
}

export default GameMessage;
