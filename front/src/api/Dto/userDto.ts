
export const BASE_URL = 'http://localhost:8080/api/user'

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