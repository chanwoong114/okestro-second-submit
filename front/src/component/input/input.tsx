import React, { useState } from 'react';

interface InputProps {
  // width?: string;
  backgroundColor?: string;
  isPassword: boolean; // isPassword prop 추가
  inputWord: string;
  placeholder: string;
  onChange: (value: string) => void;
}

/**
 * Input 컴포넌트
 * @param {string} width - input 창 가로 길이
 * @param {string} backgroundColor - input 창 배경색
 * @param {boolean} isPassword - 비밀번호 창인지 boolean 값
 * @param {string} inputWord - input 창 내용
 * @param {string} placeholder - input 창 placeholder
 */

function Input({ backgroundColor, isPassword, inputWord, placeholder, onChange }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue); // 입력 값 변경 시 부모 컴포넌트로 전달
  };

  return (
    <div
      className={`${backgroundColor} w-full rounded-lg border-2 ${
        isFocused ? 'border-black' : 'border-gray-200'
      } flex items-center h-10`}
    >
      <input
        type={isPassword? 'password' : 'text'} // 비밀번호 표시 조건 추가
        value={inputWord}
        placeholder={placeholder}
        className={`mx-1 w-full outline-none flex-grow px-2 ${backgroundColor}`}
        style={{ fontSize: '0.9rem', backgroundColor: `${backgroundColor}` }}
        onFocus={() => setIsFocused(true)} // 포커스되면 상태를 true로 변경
        onBlur={() => setIsFocused(false)} // 포커스가 없어지면 상태를 false로 변경
        onChange={handleInputChange}
      />
    </div>
  );
}

Input.defaultProps = {
  backgroundColor: '',
};

export default Input;