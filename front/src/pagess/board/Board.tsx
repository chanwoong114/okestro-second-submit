import React, { useState, useEffect } from 'react';
import useBoard from "../../api/board";
import {BoardListDto} from "../../api/Dto/boardDto";
import BoardList from "../../component/board/BoardList";
import {useNavigate} from "react-router-dom";

import { Pagination } from 'antd';
import BoardButton from "../../component/board/BoardButton";
import BoardCreateModal from "../../component/board/BaordCreateModal";

function Board() {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const { allBoard, totalPage } = useBoard();
  const [boardList, setBoardList] = useState<BoardListDto[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const updateBoardList = async () => {
    setBoardList(await allBoard(page));
    setTotalPages(await totalPage())
  }

  useEffect(() => {
    updateBoardList().then(r => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const changePage = () => {
    const newArr = []
    const clickPage = (page: number, pageSize: number) => {
      setPage(page);
    }

    newArr.push(<Pagination onChange={(page, pageSize) => clickPage(page, pageSize)} defaultCurrent={page} total={totalPages}
    showSizeChanger={false}/>)
    return newArr;
  }

  const changeModalOpen = () => {
    setModalOpen(!modalOpen)
  }


  return (
    <div className="container">
      <h1 className="text-danger">board 페이지</h1>
      {boardList?.map((board) => (
        <div key={board.boardId} onClick={() => navigate(`/board/${board.boardId}`)}>
          <BoardList boardId={board.boardId} nickname={board.nickname} title={board.title} updatedAt={board.updatedAt} />
        </div>
      ))}
      {changePage()}

      <BoardButton />
      <BoardCreateModal />
    </div>
  );
}

export default Board;