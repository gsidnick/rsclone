import React from 'react';
import RootStore from '../store/RootStore';

export const StoresContext = React.createContext(new RootStore());
