import './Learn.css';
import { useContext } from 'react';
import IAppContext from '../../interfaces/IAppContext';
import { AppContext } from '../../context/AppContext';
import { observer } from 'mobx-react-lite';
import ProgressBar from '../UI/ProgressBar/ProgressBar';
import Loader from '../UI/Loader/Loader';
import Button from '../UI/Button/Button';

function Learn() {
  const { wordStore } = useContext<IAppContext>(AppContext);

  return (
    <main className="learn">
      {!wordStore.isLoad && <ProgressBar value={wordStore.setProgress()} />}
      <div className="learn__container container">
        <div className="learn__content">
          {wordStore.isLoad && <Loader />}
          {!wordStore.isLoad && (
            <>
              <div className="learn__wrapper">
                <span className="learn__word-learn">{wordStore.currentWord.learn}%</span>
                <span className="learn__word-from">{wordStore.currentWord.word}</span>
                <span className="learn__word-to">{wordStore.currentWord.translation}</span>
              </div>
              <div className="learn__group-controls">
                <Button className="learn__button button_outline" onClick={() => wordStore.prevWord()}>
                  Previous
                </Button>
                <Button className="learn__button " onClick={() => wordStore.nextWord()}>
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default observer(Learn);
