import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthStore from './store/AuthStore';
import WordStore from './store/WordStore';
import IAppContext from './interfaces/IAppContext';

const authStore = new AuthStore();
const wordStore = new WordStore();

export const AppContext = React.createContext<IAppContext>({} as IAppContext);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <AppContext.Provider value={{ authStore, wordStore }}>
    <App />
  </AppContext.Provider>,
);
