import { SetStateAction, Dispatch } from 'react';
import IWord from './IWord';

export default interface IMainContext {
  library: IWord[],
  setLibrary: Dispatch<SetStateAction<IWord[]>>
}