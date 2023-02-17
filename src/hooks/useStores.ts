import React from 'react';
import { StoresContext } from '../context/StoresContext';

function useStores() {
  return React.useContext(StoresContext);
}

export default useStores;
