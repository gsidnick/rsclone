import { useContext, useState, useEffect } from 'react';
import { MainContext } from '../../App';
import IWord from '../../interfaces/IWord';
import './Learn.css';

function Learn() {
  const { library, points } = useContext(MainContext);

  const [currentWord, setCurrentWord] = useState<IWord>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (library[currentIndex]) setCurrentWord(library[currentIndex]);
  },[library, currentIndex]);

  function nextWord() {
    let currentIndexTmp = currentIndex;
    currentIndexTmp++;

    if (!library[currentIndexTmp]) return;
    setCurrentIndex(currentIndexTmp);
  }

  return (
    <main className="learn">
      <div className="learn__progress">
        <span style={{width: (library.length > 0 ? ((currentIndex + 1)*100)/library.length : 0) + '%'}}></span>
      </div>
      <div className="learn__container container">
        <div className="learn__points">
          <h3 className="learn__points-score">Points: {points}</h3>
        </div>
        {library.length > 0 && currentWord !== undefined
          ? <div className="learn__color-container bordered">
            <div className="learn__circle-progress">
              <span className="learn__percentage">66%</span>
            </div>
            <div className="learn__color">
              <span className="learn__color-english">{currentWord.word}</span>
              <span className="learn__color-russian">{currentWord.translation}</span>
            </div>
            <div onClick={nextWord} className="learn__button">
              <div className="learn__button-arrow"></div>
            </div>
          </div>
          : <span>Library is empty!</span>
        
        }
      </div>
    </main>
  );
}

export default Learn;
