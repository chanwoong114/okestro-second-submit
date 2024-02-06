import React, { useState, useEffect } from 'react';
import useBoard from "../../api/board";
import {BoardListDto} from "../../api/Dto/boardDto";
import {useNavigate} from "react-router-dom";

import { Pagination } from 'antd';
import BoardCreateModal from "../../component/board/BoardCreateModal";
import BoardTable from "../../component/board/BoardTable";
import './Board.css'

function Board() {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const { allBoard, totalPage } = useBoard();
  const [boardList, setBoardList] = useState<BoardListDto[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const col = [10, 35, 15, 20, 20];
  const headerContent = ['ID', '제목', '작성자', '작성일자', '수정일자'];



  const updateBoardList = async () => {
    setBoardList(await allBoard(page));
    setTotalPages(await totalPage())
  }

  useEffect(() => {
    updateBoardList().then(r => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  let bodyContent =
    boardList?.map((list) => ({
      ID: list.boardId,
      제목: list.title,
      작성자: list.nickname,
      작성일자: list.createdAt,
      수정일자: list.updatedAt,
    })) || [];


  const changePage = () => {
    const newArr = []
    const clickPage = (page: number, pageSize: number) => {
      setPage(page);
    }

    newArr.push(<Pagination onChange={(page, pageSize) => clickPage(page, pageSize)} defaultCurrent={page} total={totalPages}
    showSizeChanger={false}/>)
    return newArr;
  }

  const onGoDetailHandler = (boardId: string) => {
    navigate(`/${boardId}`)
  };


  return (
    <div className="container">
      <div className={'flex-div'}>
        <div className={'flex-h2'}>
          <h2 className={'h2-style'}>Post</h2>
        </div>
        <div className={'flex-button'}>
          <br/> <br/>
          <BoardCreateModal/>
        </div>
      </div>
      <BoardTable col={col} headerContent={headerContent} bodyContent={bodyContent} onGoDetail={onGoDetailHandler} />
      <div style={{textAlign: 'center'}}>
        {changePage()}
      </div>
    </div>
  );
}

export default Board;