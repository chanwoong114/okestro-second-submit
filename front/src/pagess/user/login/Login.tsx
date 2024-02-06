import React from 'react';
import { useState } from "react";
import {useNavigate} from "react-router-dom";

import Input from "../../../component/input/input";

import useLogin from "../../../api/user";

import symbol from "../../../etc/image/SYMBOL.png"
import "./Login.css"

function Login() {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [email, setEmail] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      alert("이메일을 입력해주세요")
      return;
    }
    else if (!passwd) {
      alert("패스워드를 입력해주세요")
      return;
    }

    await login({email, passwd})
  }


  return (
    <div className="login center-div container">
      <img className={'logo-img'} src={symbol} width={'600px'} onClick={() => navigate(`/`)} />
      <form className={'login-form'}  onSubmit={handleLogin}>
        <div className={'input-form'}>
          <Input label={'Email Address'} isPassword={false} onChange={setEmail} inputWord={email} placeholder={"아이디를 입력하세요"} />
          <Input label={'Password'} isPassword={true} onChange={setPasswd} inputWord={passwd} placeholder={"비밀번호를 입력하세요"} />
        </div>
        <div className={'button-form'}>
          <button type={"submit"}>
            <span>Login</span>
          </button>
        </div>
        <hr className={'hr'} />
        <div className={'sign-up-div'}>
          <span className={'sign-up-span2'}>회원이 아니신가요?</span>
          <span className={'sign-up-span1'} onClick={() => navigate('/sign-up')}><span>회원 가입</span></span>
        </div>
      </form>

    </div>
  );
}

export default Login;