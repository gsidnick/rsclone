import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthStore from './store/AuthStore';
import IAppContext from './interfaces/IAppContext';

const authStore = new AuthStore();

export const AppContext = React.createContext<IAppContext>({} as IAppContext);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <AppContext.Provider value={{ authStore }}>
    <App />
  </AppContext.Provider>,
);
