import { SetStateAction, Dispatch } from 'react';
import IWord from './IWord';

export default interface IMainContext {
  setLibrary: Dispatch<SetStateAction<IWord[]>>,
  library: IWord[],
  gamesLib: { name: string; description: string; }[],
  points: number,
  setPoints: Dispatch<SetStateAction<number>>
}