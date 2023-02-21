import './Statistic.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import Loader from '../UI/Loader/Loader';

function Statistic() {
  const { statisticStore } = useStores();

  return (
    <main className="statistic">
      <div className="statistic__container container">
        {statisticStore.isLoading && <Loader />}
        {!statisticStore.isLoading && (
          <>
            <div className="statistic__game">
              <div className="statistic__card-label">Game</div>
              <div className="statistic__game-title">Start random game</div>
              <Button className="statistic__start-button" onClick={() => console.log('Start random game...')}>
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
          </>
        )}
      </div>
    </main>
  );
}

export default observer(Statistic);
