import Cookies from "js-cookie";
import React, {createContext, useContext, useEffect, useState} from 'react';

export const ContextIsLogin = createContext<{
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLogin: false,
  setIsLogin: () => {},
});


export default function LoginCheck(props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {

  const [isLogin, setIsLogin] = useState<boolean>(false)
  useEffect(() => {
    if (Cookies.get('accessToken')) {
      setIsLogin(true);
    }
  }, []);


  return (
    <ContextIsLogin.Provider value={{isLogin, setIsLogin}}>
      {props.children}
    </ContextIsLogin.Provider>
  )
}


export const useIsLogin = () => useContext(ContextIsLogin);