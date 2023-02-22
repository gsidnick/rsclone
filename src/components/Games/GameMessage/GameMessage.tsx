import './GameMessage.css';
import React from 'react';
import Button from '../../UI/Button/Button';
import { useTranslation } from 'react-i18next';

function GameMessage() {
  
  const { t } = useTranslation();

  return (
    <main className="game">
      <h2>{t('Sorry, you need to add at least 3 words to your library for this game')}</h2>
      <div className="game__button-container">
        <Button className="" to="/games/">
          <span>{t('Choose another game')}</span>
        </Button>
      </div>
    </main>
  );
}

export default GameMessage;
