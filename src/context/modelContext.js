import React, { createContext, useState } from 'react';

export const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState([]);

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
};
