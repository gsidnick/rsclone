import React from 'react';
import IGameContext from '../interfaces/IGameContext';

export const GameContext = React.createContext<IGameContext>({} as IGameContext);
