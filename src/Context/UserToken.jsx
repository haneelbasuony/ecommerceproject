import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export let userToken = createContext(null);

export default function UsertTokenProvider({ children }) {
  let [isLogin, setLogin] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogin(localStorage.getItem('token'));
    }
  });

  return (
    <userToken.Provider value={{ isLogin, setLogin }}>
      {children}
    </userToken.Provider>
  );
}
