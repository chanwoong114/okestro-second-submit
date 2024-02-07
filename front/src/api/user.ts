import axios from "axios";
import Cookies from 'js-cookie';
import {LoginDto, SignUpDto, emailDto, nicknameDto, BASE_URL_USER, BASE_URL_AUTH} from "./Dto/userDto";
import {useNavigate} from "react-router-dom";
import {useIsLogin} from "../context/context";
import AlertContext from "../context/alert/AlertContext";
import {useContext} from "react";

const useLogin = () => {
  const {alert} = useContext(AlertContext);
  const navigate = useNavigate();
  const {setIsLogin} = useIsLogin();

  const login = async ({email, passwd}: LoginDto) => {
    // const prevLocation = sessionStorage.getItem('prevLocation');
    // let defaultRedirect = '/';

    try {
      const response = await axios({
        method: 'POST',
        url: BASE_URL_USER + '/login',
        data: { email, passwd }
      });

      console.log(response.data)
      setIsLogin(true);
      Cookies.set('accessToken', response.data['accessToken'])
      Cookies.set('refreshToken', response.data['refreshToken'])
      navigate('/')
      await alert('로그인 성공')
      return response.data
    } catch (error) {
      await alert('로그인 실패', true)
    }
  }

  const signUp = async ({email, passwd, name, nickname}: SignUpDto) => {

    try {
      const response = await axios({
        method: 'POST',
        url: BASE_URL_USER + '/sign-up',
        data: { email, passwd, name, nickname }
      });

      console.log(response.data)
      await alert('회원가입 성공')
      navigate('/login')
      return response.data
    } catch (error) {
      await alert('회원가입 실패', true)
    }
  }

  const checkEmail = async ({email}: emailDto) => {

    try {
      const response = await axios({
        method: 'GET',
        url: BASE_URL_AUTH + '/email-check',
        params: { email }
      });

      return response.data
    } catch (error) {
      return;
    }
  }

  const checkNickname = async ({nickname}: nicknameDto) => {

    try {
      const response = await axios({
        method: 'GET',
        url: BASE_URL_AUTH + '/nickname-check',
        params: { nickname }
      });

      return response.data
    } catch (error) {
      return;
    }
  }

  const refreshToken = async (refreshToken: string) => {
    try {
      const response = await axios({
        method: 'POST',
        url: BASE_URL_AUTH + '/refresh-token',
        data: {refreshToken}
      });
      Cookies.set('accessToken', response.data['accessToken'])
      Cookies.set('refreshToken', response.data['refreshToken'])
      return true;
    } catch (error) {
      return false;
    }
  }


  return {login, signUp, checkEmail, checkNickname, refreshToken}
}

export default useLogin;
