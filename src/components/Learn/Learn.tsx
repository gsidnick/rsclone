import './Learn.css';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../UI/ProgressBar/ProgressBar';
import Loader from '../UI/Loader/Loader';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import WordIteratorStore from '../../store/WordIteratorStore';

const wordIteratorStore = new WordIteratorStore();

function Learn() {
  const { t } = useTranslation();

  const { wordStore } = useStores();
  wordIteratorStore.setWords(wordStore.words);

  return (
    <main className="learn">
      {!wordStore.isLoading && <ProgressBar value={wordIteratorStore.setProgress()} />}
      <div className="learn__container container">
        <div className="learn__content">
          {wordStore.isLoading && <Loader />}
          {!wordStore.isLoading && (
            <>
              <div className="learn__wrapper">
                <span className="learn__word-learn">{wordIteratorStore.current.learn}%</span>
                <span className="learn__word-from">{wordIteratorStore.current.word}</span>
                <span className="learn__word-to">{wordIteratorStore.current.translation}</span>
              </div>
              <div className="learn__group-controls">
                <Button className="learn__button button_outline" onClick={() => wordIteratorStore.prevWord()}>
                  <span>{t('Previous')}</span>
                </Button>
                <Button className="learn__button " onClick={() => wordIteratorStore.nextWord()}>
                  <span>{t('Next')}</span>
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
