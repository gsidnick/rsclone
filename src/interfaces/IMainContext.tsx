import { SetStateAction, Dispatch } from 'react';
import ILibrary from '../interfaces/ILibrary';

export default interface IMainContext {
  setLibrary: Dispatch<SetStateAction<ILibrary[]>>,
  library: ILibrary[],
  gamesLib: { name: string; description: string; }[],
  points: number,
  setPoints: Dispatch<SetStateAction<number>>
}