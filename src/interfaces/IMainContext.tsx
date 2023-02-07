import { SetStateAction, Dispatch } from 'react';
import ILibrary from '../interfaces/ILibrary';

export default interface IMainContext {
  setLibrary: Dispatch<SetStateAction<ILibrary[]>>,
  library: ILibrary[]
}