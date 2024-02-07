import React, {useContext} from 'react';
import { useState } from "react";
import {useNavigate} from "react-router-dom";

import Input from "../../../component/input/input";

import useSignUp from "../../../api/user";
import './SignUp.css'
import '../login/Login.css'
import symbol from "../../../etc/image/SYMBOL.png";
import AlertContext from "../../../context/alert/AlertContext";

interface checkState {
  prev: string
  state: number
}

function SignUp() {
  const {alert} = useContext(AlertContext);
  const navigate = useNavigate();
  const { signUp, checkEmail, checkNickname } = useSignUp();
  const [email, setEmail] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [passwdCheck, setPasswdCheck] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const [emailState, setEmailState] = useState<number>(0);
  const [passwordState, setPasswordState] = useState<number>(0);
  const [nicknameState, setNicknameState] = useState<number>(0);

  const [prevEmail, setPrevEmail]  = useState<checkState>({prev: '', state: 0});
  const [prevNickname, setPrevNickname] = useState<checkState>({prev: '', state: 0});

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    if (!email) {
      await alert("이메일을 입력해주세요", true);
      return;
    }
    else if (emailState !== 1) {
      await alert("이메일 중복 확인을 해주세요", true);
      return;
    }
    else if (!passwd) {
      await alert("패스워드를 입력해주세요", true);
      return;
    }
    else if (passwd !== passwdCheck) {
      await alert("비밀번호가 같지 않습니다.", true);
      return;
    }
    else if (!name) {
      await alert('이름을 입력해주세요', true);
      return;
    }
    else if (!nickname) {
      await alert('닉네임을 입력해주세요', true);
      return;
    }
    else if (nicknameState !== 1) {
      await alert('닉네임 중복 확인을 해주세요', true);
      return;
    }

    await signUp({email, passwd, name, nickname});
  }

  const setEmailHandler = (emailHandle: string) => {
    setEmail(emailHandle)
    if (emailHandle && !emailHandle.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailState(3);
      return
    }
    if (!prevEmail.prev) {
      setEmailState(0)
      return;
    }
    if (prevEmail.prev !== emailHandle) {
      setEmailState(0);
      return
    }
    if (prevEmail.prev === emailHandle) {
      setEmailState(prevEmail.state);
    }
  }

  const checkEmailHandle: React.MouseEventHandler = async () => {
    if (!email) {
      setEmailState(0)
      await alert("이메일을 입력하세요", true)
      return;
    }
    if (emailState === 3) {
      await alert("이메일 형식으로 입력하세요", true)
      return;
    }
    const response = await checkEmail({email});
    if (Boolean(response)) {
      setPrevEmail({prev: email, state: 1});
      setEmailState(1);
      return;
    }
    setEmailState(2);
    setPrevEmail({prev: email, state: 2});
  }

  const checkPasswordHandle = (passwordCheck: string) => {
    setPasswdCheck(passwordCheck);

    if (!passwordCheck) {
      setPasswordState(0);
      return;
    } else if (passwd === passwordCheck) {
      setPasswordState(1);
      return;
    }
    setPasswordState(2);
  }

  const setNicknameHandler = (nicknameHandle: string) => {
    setNickname(nicknameHandle)
    if (!prevNickname.prev) {
      return;
    }
    if (prevNickname.prev !== nicknameHandle) {
      setNicknameState(0);
      return
    }
    if (prevNickname.prev === nicknameHandle) {
      setNicknameState(prevNickname.state);
    }
  }

  const checkNicknameHandle: React.MouseEventHandler = async () => {
    if (!nickname) {
      setNicknameState(0)
      await alert("닉네임을 입력하세요", true)
      return;
    }
    const response = await checkNickname({nickname});
    if (Boolean(response)) {
      setNicknameState(1);
      setPrevNickname({prev: nickname, state: 1})
      return;
    }
    setNicknameState(2);
    setPrevNickname({prev: nickname, state: 2})

  }

  return (
    <div className={'login center-div container'}>
      <img className={'logo-img'} src={symbol} width={'600px'} onClick={() => navigate(`/`)}/>
      <form className={'sign-up-form'} onSubmit={handleSignUp}>
        <div className={'sign-up-input-form'}>
          <Input label={'Email Address'} isPassword={false} onChange={setEmailHandler} inputWord={email}
                 placeholder={"이메일을 입력하세요"} checkButton={{isButton:'이메일', handleFunc:checkEmailHandle}}/>
          <p className={emailState === 1 ? 'check-p' : 'hidden-p'}>사용 가능한 이메일입니다.</p>
          <p className={emailState === 2 ? 'un-check-p' : 'hidden-p'}>이미 사용중인 이메일입니다.</p>
          <p className={emailState === 3 ? 'un-check-p' : 'hidden-p'}>아매일 형식이 맞지 않습니다.</p>

          <Input label={'Password'} isPassword={true} onChange={setPasswd} inputWord={passwd}
                 placeholder={"비밀번호를 입력하세요"}/>
          <Input label={'Password Check'} isPassword={true} onChange={checkPasswordHandle} inputWord={passwdCheck}
                 placeholder={"비밀번호를 한번 더 입력하세요"}/>
          <p className={passwordState === 1 ? 'check-p' : 'hidden-p'}>비밀번호가 일치합니다.</p>
          <p className={passwordState === 2 ? 'un-check-p' : 'hidden-p'}>비밀번호가 일치하지 않습니다.</p>

          <Input label={'Name'} isPassword={false} onChange={setName} inputWord={name}
                 placeholder={"이름를 입력하세요"}/>

          <Input label={'Nickname'} isPassword={false} onChange={setNicknameHandler} inputWord={nickname}
                 placeholder={"닉네임를 입력하세요"} checkButton={{isButton:'닉네임', handleFunc:checkNicknameHandle}}/>
          <p className={nicknameState === 1 ? 'check-p' : 'hidden-p'}>사용 가능한 닉네임 이메일입니다.</p>
          <p className={nicknameState === 2 ? 'un-check-p' : 'hidden-p'}>이미 사용중인 닉네임입니다.</p>

        </div>
        <div className={'button-form'}>
          <button type={"submit"}>
            <span>Sign Up</span>
          </button>
        </div>
        <hr className={'hr'}/>
        <div className={'sign-up-div'}>
          <span className={'sign-up-span2'}>회원이신가요?</span>
          <span className={'sign-up-span1'} onClick={() => navigate('/login')}><span>로그인</span></span>
        </div>
      </form>
    </div>
  )
    ;
}

export default SignUp;