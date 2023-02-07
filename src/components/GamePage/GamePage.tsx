import { useState, useEffect, ReactElement } from 'react';
import './GamePage.css';
import { useParams } from 'react-router-dom';
import Game1 from '../Games/Game1';

function GamePage() {
  const [content, setContent] = useState<ReactElement | null>(null);

  const params = useParams();

  useEffect(() => {
    const number: number | null = (params && params.number) ? +params.number : null;

    if (!isNaN((number as number))) {
      if (number === 1) setContent(Game1);
    }
  },[params]);

  return  (
    <main className="gamepage">
      <div className="gamepage__container container">
        {content}
      </div>
    </main>
  );
}

export default GamePage;
