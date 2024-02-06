
export const BASE_URL_USER = 'http://localhost:8080/api/user'
export const BASE_URL_AUTH = 'http://localhost:8080/api/auth'

export interface LoginDto {
  email: string,
  passwd: string
}

export interface SignUpDto {
  email: string,
  passwd: string,
  name: string,
  nickname: string
}

export interface emailDto {
  email: string
}

export interface nicknameDto {
  nickname: string
}