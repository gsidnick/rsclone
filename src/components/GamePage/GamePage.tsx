import './GamePage.css';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GameFunctionalComponent } from '../../types/GameFunctionalComponent';
import GameNotFound from '../Games/GameNotFound/GameNotFound';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import { useTranslation } from 'react-i18next';
import GameStore from '../../store/GameStore';

function GamePage() {
  const { t } = useTranslation();
  const { gameStore } = useStores();
  const params = useParams();
  const gameNumber = Number(params.id);
  const Game: GameFunctionalComponent | undefined = gameStore.loadGame(gameNumber);

  return (
    <main className="gamepage">
      <div className="gamepage__container container">
        {Game !== undefined && (
          <>
            <div className="gamepage__panel">
              <Button className="button_back" to="/games/">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="button__arrow"
                    d="M33 20C34.1046 20 35 19.1046 35 18C35 16.8954 34.1046 16 33 16V20ZM1.58578 16.5858C0.804736 17.3668 0.804736 18.6332 1.58578 19.4142L14.3137 32.1421C15.0948 32.9232 16.3611 32.9232 17.1421 32.1421C17.9232 31.3611 17.9232 30.0948 17.1421 29.3137L5.82843 18L17.1421 6.68629C17.9232 5.90524 17.9232 4.63891 17.1421 3.85786C16.3611 3.07682 15.0948 3.07682 14.3137 3.85786L1.58578 16.5858ZM33 16L3 16V20L33 20V16Z"
                    fill="black"
                  />
                </svg>
              </Button>
              <div className="gamepage__score">
                <span className="gamepage__wrong">{t('Wrong')} : {gameStore.wrong}</span>
                <span className="gamepage__correct">{t('Correct')} : {gameStore.correct}</span>
                <span className="gamepage__points">{t('Points')} : {gameStore.points}</span>
              </div>
            </div>
            <div className="gamepage__content">
              <Game />
            </div>
          </>
        )}
        {Game === undefined && <GameNotFound />}
      </div>
    </main>
  );
}

export default observer(GamePage);
