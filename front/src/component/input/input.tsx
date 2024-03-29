import React, {MouseEventHandler} from 'react';
import './input.css'

interface InputProps {
  // width?: string;
  label: string
  isPassword: boolean; // isPassword prop 추가
  inputWord: string;
  placeholder: string;
  onChange: (value: string) => void;
  checkButton?: ButtonProps;
}

interface ButtonProps {
  isButton: string;
  handleFunc: React.MouseEventHandler;
}

/**
 * Input 컴포넌트
 * @param {string} width - input 창 가로 길이
 * @param {string} backgroundColor - input 창 배경색
 * @param {boolean} isPassword - 비밀번호 창인지 boolean 값
 * @param {string} inputWord - input 창 내용
 * @param {string} placeholder - input 창 placeholder
 */

function Input({ label, isPassword, inputWord, placeholder, onChange, checkButton }: InputProps) {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue); // 입력 값 변경 시 부모 컴포넌트로 전달
  };



  return (
    <div className={'input-group'}>
      <label className={'label1'}>{label}</label>
      <div>
        <input
          className={'input1'}
          type={isPassword? 'password' : 'text'} // 비밀번호 표시 조건 추가
          value={inputWord}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
      </div>
      {checkButton?.isButton && (
        <div>
          <span className={'absolute-span'} onClick={checkButton?.handleFunc}>
            {checkButton.isButton} 중복 확인
          </span>
        </div>
      )}
    </div>
  );
}

export default Input;