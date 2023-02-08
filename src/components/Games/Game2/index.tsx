import './style.css'
import IGameData from '../../../interfaces/IGameData';

function Game2(data: IGameData) {
  console.log(data);
  return (
    <main className="game">
      <div className="game__container container">
        Game 2(Two) content
      </div>
    </main>
  )
}

export default Game2;
