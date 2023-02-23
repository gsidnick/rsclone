import './GameNotFound.css';
import React from 'react';
import Button from '../../UI/Button/Button';
import { useTranslation } from 'react-i18next';

function GameNotFound() {
  
  const { t } = useTranslation();

  return (
    <div className="gamenotfound">
      <h1 className="gamenotfound__heading">{t('Sorry, this game not found!')}</h1>
      <Button className="" to="/games/">
        <>{t('Choose another game')}</>
      </Button>
    </div>
  );
}

export default GameNotFound;
