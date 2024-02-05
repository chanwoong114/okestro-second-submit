import React, { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import {BoardResponseDto} from "../../api/Dto/boardDto";
import useBoard from "../../api/board";


function BoardDetail() {
  const { detailBoard } = useBoard();
  const { id } = useParams<{ id: string }>();
  const boardId: number = Number(id);
  const [boardInfo, setBoardInfo] = useState<BoardResponseDto>();

  const getBoardInfo = async () => {
    console.log(boardId)
    setBoardInfo(await detailBoard(boardId))
  }



  useEffect(() => {
    getBoardInfo().then(() => null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      { boardInfo &&
          <>
              <h1>{boardId}</h1>
              <p>{boardInfo?.boardId}</p>
              <p>{boardInfo?.nickname}</p>
              <p>{boardInfo?.title}</p>
              <p>{boardInfo?.content}</p>
              <p>{boardInfo?.createdAt.toString()}</p>
              <p>{boardInfo?.updatedAt.toString()}</p>
          </>
      }
    </div>
  );
}

export default BoardDetail;