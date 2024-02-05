import React from 'react';
import { useState } from "react";

import Input from "../../component/input/input";

import useLogin from "../../api/user";

function Login() {
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
    <div className="login">
      <form onSubmit={handleLogin}>
        <Input isPassword={false} onChange={setEmail} inputWord={email} placeholder={"아이디를 입력하세요"} />
        <Input isPassword={true} onChange={setPasswd} inputWord={passwd} placeholder={"비밀번호를 입력하세요"} />
        <button type={"submit"}>로그인</button>
      </form>

    </div>
  );
}

export default Login;