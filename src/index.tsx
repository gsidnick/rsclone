import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthStore from './store/AuthStore';
import WordStore from './store/WordStore';
import { AppContext } from './context/AppContext';

const authStore = new AuthStore();
const wordStore = new WordStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <AppContext.Provider value={{ authStore, wordStore }}>
    <App />
  </AppContext.Provider>,
);
