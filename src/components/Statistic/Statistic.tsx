import './Statistic.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import Loader from '../UI/Loader/Loader';
import { useNavigate } from 'react-router-dom';

function Statistic() {
  const { statisticStore, gameStore } = useStores();
  const navigate = useNavigate();
  gameStore.generateGame();

  return (
    <main className="statistic">
      <div className="statistic__container container">
        {statisticStore.isLoading && <Loader />}
        {!statisticStore.isLoading && (
          <div className="statistic__grid">
            <div className="statistic__game">
              <div className="statistic__card-label">Game</div>
              <div className="statistic__game-title">{gameStore.game.name}</div>
              <div className="statistic__game-description">{gameStore.game.description}</div>
              <Button className="statistic__start-button" onClick={() => navigate(gameStore.game.link)}>
                Play
              </Button>
            </div>
            <div className="statistic__score">
              <div className="statistic__card-label">Score</div>
              <div className="statistic__card-value">{String(statisticStore.statistic.score)} points</div>
            </div>
            <div className="statistic__level">
              <div className="statistic__card-label">Level</div>
              <div className="statistic__card-value">{String(statisticStore.statistic.level)} level</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default observer(Statistic);
