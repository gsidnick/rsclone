import React from 'react';
import IAppContext from '../interfaces/IAppContext';

export const AppContext = React.createContext<IAppContext>({} as IAppContext);
