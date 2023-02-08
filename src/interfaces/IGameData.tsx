import { SetStateAction, Dispatch } from 'react';
import ILibrary from '../interfaces/ILibrary';

export default interface IGameData {
  data:(number | ILibrary[] | Dispatch<SetStateAction<number>> | { word: string; translate: string; } | Dispatch<SetStateAction<{ word: string; translate: string; }>>)[]
}