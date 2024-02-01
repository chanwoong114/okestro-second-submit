import React from 'react';
import { useState } from "react";

import Input from "../../component/input/input";

import useSignUp from "../../api/signup";
import signup from "../../api/signup";

function SignUp() {
  const { signUp } = useSignUp();
  const [email, setEmail] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [passwdCheck, setPasswdCheck] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      alert("이메일을 입력해주세요");
      return;
    }
    else if (!passwd) {
      alert("패스워드를 입력해주세요");
      return;
    }
    else if (passwd !== passwdCheck) {
      alert("비밀번호가 같지 않습니다.");
      return;
    }
    else if (!name) {
      alert('이름을 입력해주세요');
      return;
    }
    else if (!nickname) {
      alert('닉네임을 입력해주세요');
      return;
    }

    await signUp({email, passwd, name, nickname});
  }

  return (
      <div className="sign-up">
        <form onSubmit={handleSignUp}>
          <Input isPassword={false} onChange={setEmail} inputWord={email} placeholder={"아이디를 입력하세요"}/>
          <Input isPassword={true} onChange={setPasswd} inputWord={passwd} placeholder={"비밀번호를 입력하세요"}/>
          <Input isPassword={true} onChange={setPasswdCheck} inputWord={passwdCheck} placeholder={"비밀번호를 한번 더 입력하세요"}/>
          <Input isPassword={false} onChange={setName} inputWord={name} placeholder={"이름를 입력하세요"}/>
          <Input isPassword={false} onChange={setNickname} inputWord={nickname} placeholder={"닉네임를 입력하세요"}/>
          <button type={"submit"}>회원가입</button>
        </form>
      </div>
  );
}

export default SignUp;