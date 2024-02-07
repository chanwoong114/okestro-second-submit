import { useEffect } from 'react';
import Info from "../../component/alert/Info";
import Danger from "../../component/alert/Danger";

interface Props {
  message: string;
  type?: boolean
  onClose: () => void;
}

const Alert = ({ message, onClose, type }: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    setTimeout(onClose, 4000)
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="dialog-container-alert">
      <div className="overlay-alert" onClickCapture={(e) => e.stopPropagation()} />
      <div className="dialog-alert">
        {!type &&
            <div>
              <Info message={message} onClose={onClose} />
              <h1>
                {!type}
              </h1>
            </div>
        }
        {type &&
          <Danger message={message} onClose={onClose} />
        }
      </div>
    </div>
  );
};

export default Alert;