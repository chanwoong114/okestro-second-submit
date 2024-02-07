import { useState } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import Alert from './Alert';

type AlertState = {
  message: string;
  type?: boolean
  onClose: () => void;
};

const AlertDialog = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AlertState>();

  const alert = (message?: any, type?: boolean): Promise<undefined> => {
    return new Promise((resolve) => {
      setState({
        message: message !== undefined ? `${message}` : '',
        type: type !== undefined? type: false,
        onClose: () => {
          setState(undefined);
          resolve(undefined);
        },
      });
    });
  };

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      {state && <Alert message={state.message} onClose={state.onClose} type={state.type} />}
    </AlertContext.Provider>
  );
};

export default AlertDialog;