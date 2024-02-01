import React from 'react';
import {useParams} from "react-router-dom";


function BoardDetail() {

  const { id } = useParams<{ id: string }>();
  const boardId: number = Number(id);

  return (
    <div>
      <h1>{boardId}</h1>
    </div>
  );
}

export default BoardDetail;