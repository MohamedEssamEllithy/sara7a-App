import React, { createContext, useState } from 'react'
import style from './Context.module.css'


export let TokenContext =createContext()

export default function TokenContextProvider ({ children }) {
  const [Token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ Token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
