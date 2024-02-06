import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance =  axios.create({
  baseURL: "http://localhost:8080/api/board",
})

axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 전에 처리해야 할 작업
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
      return newConfig;
    }
    return config;
  },
  (error) =>
    // 요청 전에 에러가 발생한 경우
    Promise.reject(error),
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    // refresh token 갱신 추가 필요


    Promise.reject(error),
);


export default axiosInstance;