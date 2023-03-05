import './Message.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import { useNavigate } from 'react-router-dom';

function GameEndMessage() {
  const { gameStore, modalStore, statisticStore } = useStores();
  const navigate = useNavigate();

  async function savePoints() {
    statisticStore.setScore(gameStore.points);
    await statisticStore.updateStatistic();
  }

  async function againButtonHandler() {
    await modalStore.closeModal();
    await savePoints();
    gameStore.reset();
  }

  async function exitButtonHandler() {
    await modalStore.closeModal();
    await savePoints();
    navigate('/');
    gameStore.reset();
  }

  return (
    <div className="message">
      {gameStore.correct === 0 && (
        <>
          <h1 className="message__title">Game is over!</h1>
          <p className="message__text">
            You answered <span className="message__text-bold">{gameStore.correct}</span> out of{' '}
            <span className="message__text-bold">{gameStore.total}</span> questions correctly!
            <br />
            Do you want start again?
          </p>
          <div className="message__group-controls">
            <Button onClick={againButtonHandler}>Again</Button>
            <Button className="button_grey" onClick={exitButtonHandler}>
              Exit
            </Button>
          </div>
        </>
      )}
      {gameStore.correct > 0 && gameStore.correct < gameStore.total && (
        <>
          <h1 className="message__title">Not bad!</h1>
          <p className="message__text">
            You answered <span className="message__text-bold">{gameStore.correct}</span> out of{' '}
            <span className="message__text-bold">{gameStore.total}</span> questions correctly!
            <br />
            Do you want start again?
          </p>
          <div className="message__group-controls">
            <Button onClick={againButtonHandler}>Again</Button>
            <Button className="button_grey" onClick={exitButtonHandler}>
              Exit
            </Button>
          </div>
        </>
      )}
      {gameStore.correct === gameStore.total && (
        <>
          <h1 className="message__title">Congratulation!</h1>
          <p className="message__text">You answered all the questions correctly!</p>
          <div className="message__group-controls">
            <Button onClick={exitButtonHandler}>Go to learn more</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(GameEndMessage);
