import axios from "axios";
import Cookies from 'js-cookie';
import {SignUpDto, BASE_URL} from "./Dto/userDto";


const useSignUp = () => {

  const signUp = async ({email, passwd, name, nickname}: SignUpDto) => {

    try {
      const response = await axios({
        method: 'POST',
        url: BASE_URL + '/sign-up',
        data: { email, passwd, name, nickname }
      });

      console.log(response.data)

      return response.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  return {signUp}
}

export default useSignUp;
