import AuthStore from '../store/AuthStore';
import WordStore from '../store/WordStore';

export default interface IAppContext {
  authStore: AuthStore;
  wordStore: WordStore;
}
