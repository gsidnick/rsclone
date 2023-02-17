import './Learn.css';
import { observer } from 'mobx-react-lite';
import ProgressBar from '../UI/ProgressBar/ProgressBar';
import Loader from '../UI/Loader/Loader';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import WordIteratorStore from '../../store/WordIteratorStore';

const wordIteratorStore = new WordIteratorStore();

function Learn() {
  const { wordStore } = useStores();
  wordIteratorStore.setWords(wordStore.words);

  return (
    <main className="learn">
      {!wordStore.isLoad && <ProgressBar value={wordIteratorStore.setProgress()} />}
      <div className="learn__container container">
        <div className="learn__content">
          {wordStore.isLoad && <Loader />}
          {!wordStore.isLoad && (
            <>
              <div className="learn__wrapper">
                <span className="learn__word-learn">{wordIteratorStore.current.learn}%</span>
                <span className="learn__word-from">{wordIteratorStore.current.word}</span>
                <span className="learn__word-to">{wordIteratorStore.current.translation}</span>
              </div>
              <div className="learn__group-controls">
                <Button className="learn__button button_outline" onClick={() => wordIteratorStore.prevWord()}>
                  Previous
                </Button>
                <Button className="learn__button " onClick={() => wordIteratorStore.nextWord()}>
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
