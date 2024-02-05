import React from 'react';
import {BoardListDto} from "../../api/Dto/boardDto";

const BoardList: React.FC<BoardListDto> = (board : BoardListDto) => {
  return (
    <div>
      <div>
        <p>{board.title}, {board.nickname}, {board.boardId}, {String(board.updatedAt)}</p>
        <br/>
      </div>
    </div>
  );
}

export default BoardList;