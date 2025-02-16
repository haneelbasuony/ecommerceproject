import { createContext, useState } from 'react';

export const numitem = createContext(0);
export default function NumItemContextProvider({ children }) {
  let [numItems, setNumItems] = useState(0);
  return (
    <numitem.Provider value={{ numItems, setNumItems }}>
      {children}
    </numitem.Provider>
  );
}
