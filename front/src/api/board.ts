import axios from "axios";
import axiosInstance from "./axiosInstance";
import {BoardIdDto, BASE_URL, BoardListDto, BoardResponseDto, UpdateBoardDto, CreateBoardDtd} from "./Dto/boardDto";
import {useNavigate} from "react-router-dom";

const useBoard = () => {
  const navigate = useNavigate();
  const createBoard = async ({content, title}: CreateBoardDtd) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: BASE_URL + '/create',
        data: {content, title}
      })
      return response.data
    } catch (error) {
      console.error(error);
      throw error
    }
  }


  const updateBoard = async ({boardId, content, title}: UpdateBoardDto) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: BASE_URL + '/update',
        data: {boardId, content, title}
      })
      return response.data
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  const deleteBoard = async ({boardId}: BoardIdDto) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: BASE_URL + '/delete',
        data: {boardId}
      })
      return response.data
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  const detailBoard = async (boardId: number | undefined) => {
    try {
      const response = await axios({
        method: 'GET',
        url: BASE_URL + '/get/detail',
        params: {boardId}
      })
      const boardResponse: BoardResponseDto = response.data
      console.log(response.data)
      if (boardResponse.boardId === undefined) {
        alert("해당 게시글이 없습니다.")
        navigate('/board');
      }
      return boardResponse
    } catch (error) {
      console.error(error);
      navigate('/board');
    }
  }

  const allBoard = async (page: number) => {
    try {
      const response = await axios({
        method: 'GET',
        url: BASE_URL + '/get/total',
        params: {page}
      })
      const boardList: BoardListDto[] = response.data;
      return boardList;
    } catch (error) {
      throw error
    }
  }

  const totalPage = async () => {
    try {
      const response  = await axios({
        method: 'GET',
        url: BASE_URL + '/get/total-page',
      })
      return Number(response.data)
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  return {createBoard, updateBoard, deleteBoard, allBoard, detailBoard, totalPage}
}

export default useBoard;