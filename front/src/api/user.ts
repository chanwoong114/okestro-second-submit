import axios from "axios";
import Cookies from 'js-cookie';
import {LoginDto, BASE_URL} from "./Dto/userDto";


const useLogin = () => {

  const login = async ({email, passwd}: LoginDto) => {
    const prevLocation = sessionStorage.getItem('prevLocation');
    let defaultRedirect = '/';

    try {
      const response = await axios({
        method: 'POST',
        url: BASE_URL + '/login',
        data: { email, passwd }
      });

      console.log(response.data)

      Cookies.set('accessToken', response.data['accessToken'])
      Cookies.set('refreshToken', response.data['refreshToken'])

      return response.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  return {login}
}

export default useLogin;
