import { useEffect } from 'react';

interface Props {
  message: string;
  onClickOK: () => void;
  onClickCancel: () => void;
}

const Confirm = ({ message, onClickOK, onClickCancel }: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClickCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClickCancel]);

  return (
    <div className="dialog-container">
      <div className="overlay" onClick={onClickCancel} />
      <div className="dialog">
        <h2 className="title">경고</h2>
        <div className="text">{message}</div>
        <div className="buttons">
          <button className="cancel" onClick={onClickCancel}>취소</button>
          <button className="ok" onClick={onClickOK} autoFocus>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;