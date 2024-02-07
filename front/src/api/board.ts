import axios from "axios";
import axiosInstance from "./axiosInstance";
import {BoardIdDto, BASE_URL, BoardListDto, BoardResponseDto, UpdateBoardDto, CreateBoardDtd} from "./Dto/boardDto";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import useLogin from "./user";
import AlertContext from "../context/alert/AlertContext";
import {useContext} from "react";


const useBoard = () => {
  const {alert} = useContext(AlertContext);
  const {refreshToken} = useLogin();
  const navigate = useNavigate();


  const createBoard = async ({title, content}: CreateBoardDtd) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: BASE_URL + '/create',
        data: {title, content},

      })
      return response.data
    } catch (error) {
      console.error(error);
      throw error
    }
  }


  const updateBoard = async ({boardId, title, content}: UpdateBoardDto) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: BASE_URL + '/update',
        data: {boardId, title, content}
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
        navigate('/');
        await alert("해당 게시글이 없습니다.", true)
      }
      return boardResponse
    } catch (error) {
      console.error(error);
      navigate('/');
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

  const checkMine = async (boardId: number)=> {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: BASE_URL + '/check-mine',
        params: {boardId}
      })
      return response.data
    } catch (error) {
      console.error(error);
      throw error
    }
  }



  return {createBoard, updateBoard, deleteBoard, allBoard, detailBoard, totalPage, checkMine}
}

export default useBoard;