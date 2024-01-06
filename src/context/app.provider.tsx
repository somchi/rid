import React, { useReducer } from 'react';
import { AppContext, INITIAL_STATE } from './app.context';
import { appReducer } from './app.reducer';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
