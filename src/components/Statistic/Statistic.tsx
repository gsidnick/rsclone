import './Statistic.css';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import Loader from '../UI/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IGame from '../../interfaces/IGame';

function Statistic() {
  const { t } = useTranslation();
  const cards = t('cards', { returnObjects: true }) as [];
  const { statisticStore, gameStore } = useStores();
  const navigate = useNavigate();
  const [game, setGame] = useState({} as IGame);

  useEffect(() => {
    if (!statisticStore.isLoading) {
      const index: number = gameStore.generateIndexGame();
      const link = `/games/${index + 1}`;
      const { name, description, image } = cards[index];
      setGame({ name, description, image, link });
    }
  }, [statisticStore.isLoading]);

  return (
    <main className="statistic">
      <div className="statistic__container container">
        {statisticStore.isLoading && <Loader />}
        {!statisticStore.isLoading && (
          <div className="statistic__grid">
            <div className="statistic__game">
              <div className="statistic__card-label">Game</div>
              <div className="statistic__game-title">{game.name}</div>
              <div className="statistic__game-description">{game.description}</div>
              <Button className="statistic__start-button" onClick={() => navigate(game.link)}>
                <>{t('Play')}</>
              </Button>
            </div>
            <div className="statistic__score">
              <div className="statistic__card-label">Score</div>
              <div className="statistic__card-value">{statisticStore.score} points</div>
            </div>
            <div className="statistic__level">
              <div className="statistic__card-label">Level</div>
              <div className="statistic__card-value">{statisticStore.level} level</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default observer(Statistic);
