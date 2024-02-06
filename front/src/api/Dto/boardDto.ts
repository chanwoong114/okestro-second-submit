export const BASE_URL = 'http://localhost:8080/api/board'

export interface CreateBoardDtd {
  title: string
  content: string,
}

export interface BoardIdDto {
  boardId: number
}

export interface UpdateBoardDto {
  boardId: number,
  title: string
  content: string,
}

export interface BoardResponseDto {
  boardId: number,
  userId: number,
  nickname: string,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date
}

export interface BoardListDto {
  boardId: number,
  nickname: string,
  title: string,
  updatedAt: Date,
  createdAt: Date
}