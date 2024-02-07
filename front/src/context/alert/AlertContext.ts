import { createContext } from 'react';

type Type = {
  alert: (message?: any, type?:boolean) => Promise<undefined>;
};

const AlertContext = createContext<Type>({
  alert: () => new Promise((_, reject) => reject()),
});

export default AlertContext;