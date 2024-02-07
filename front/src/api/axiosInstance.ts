import axios, {AxiosError, InternalAxiosRequestConfig} from "axios";
import Cookies from "js-cookie";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
  async (error: AxiosError) => {
    const originalRequest = error.config;
    // 401 에러 코드가 반환되었는지 확인합니다.
    if (error.response && error.response.status === 403 && typeof originalRequest !== "undefined") {
      try {
        const refreshToken = Cookies.get('refreshToken')
        // 토큰을 재발급 받는 API 호출
        const { data } = await axios.post('http://localhost:8080/api/auth/refresh-token', {
          // refresh token 등을 포함하여 요청을 보냅니다.
          refreshToken
        });

        // 새로운 토큰을 받은 경우, localStorage 또는 다른 저장소에 저장합니다.
        // 이후에 재시도할 원래 요청에 새로운 토큰을 추가합니다.
        // 예: localStorage.setItem('accessToken', data.accessToken);

        Cookies.set('accessToken', data.accessToken);
        Cookies.set('refreshToken', data.refreshToken);
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        // 새로운 토큰을 추가한 요청을 다시 실행합니다.
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // refresh token을 이용한 토큰 재발급에 실패한 경우, 로그인 페이지로 리다이렉트 또는 다른 처리를 수행할 수 있습니다.
        alert('다시 로그인해주세요')
        return Promise.reject(refreshError);
      }
    }


    return Promise.reject(error);
  }
);


export default axiosInstance;