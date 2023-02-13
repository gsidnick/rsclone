import { SetStateAction, Dispatch } from 'react';
import IWord from './IWord';

export default interface IAppContext {
  setLibrary: Dispatch<SetStateAction<IWord[]>>;
  library: IWord[];
  libraryGames: { name: string; description: string; }[];
  points: number;
  setPoints: Dispatch<SetStateAction<number>>;
}