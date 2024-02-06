import React, { useEffect, useState } from 'react';
import {useParams, useNavigate } from "react-router-dom";
import {BoardResponseDto} from "../../api/Dto/boardDto";
import useBoard from "../../api/board";
import './BoardDetail.css'
import BoardCreateModal from "../../component/board/BoardCreateModal";
import {Button} from "antd";
import { useIsLogin } from "../../context";

function BoardDetail() {
  const {isLogin} = useIsLogin();
  const navigate = useNavigate();
  const { detailBoard, checkMine, deleteBoard } = useBoard();
  const { id } = useParams<{ id: string }>();
  const boardId: number = Number(id);
  const [boardInfo, setBoardInfo] = useState<BoardResponseDto>();
  const [isMine, setIsMine] = useState<boolean>(false)

  const getBoardInfo = async () => {
    console.log(boardId)
    setBoardInfo(await detailBoard(boardId))

    if (isLogin && !isMine) {
      setIsMine(await checkMine(boardId))
    }
  }

  const deleteHandler = async () => {
    const isDelete = window.confirm('삭제 하시겠습니까?')
    if (isDelete) {
      await deleteBoard({boardId})
      navigate('/')
      return;
    }
  }

  useEffect(() => {
    getBoardInfo().then(() => null);
    if (!isLogin) {
      setIsMine(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);


  return (
    <div className={'container'}>
      <div className={'detail-div-outside'}>
        { boardInfo &&
            <div className={'container detail-div-inside'}>
                <div className={'detail-up'}>
                    <div className={'detail-up-left'}>
                      <p className={'detail-title'}>{boardInfo?.title}</p>
                      <p className={'detail-description'}><span>글 번호 : </span>{boardInfo?.boardId}</p>
                    </div>
                    <div className={'detail-up-right'}>
                      <p className={'detail-description'}><span>낙네임 : </span>{boardInfo?.nickname}</p>
                      <p className={'detail-description'}><span>작성일자 : </span>{boardInfo?.createdAt.toString()}</p>
                      <p className={'detail-description'}><span>수정일자 : </span>{boardInfo?.updatedAt.toString()}</p>
                    </div>
                </div>
                <hr/>
                <p className={'div-p'}>{boardInfo?.content}</p>
                {isMine &&
                  <div style={{display: 'flex'}}>
                    <div className={'hidden-div'}>
                      <div className={'absolute-div'}>
                        <BoardCreateModal titleProps={boardInfo?.title} contentProps={boardInfo?.content} boardId={boardId} />
                        <Button style={{marginLeft: '20px'}} type={'primary'} danger onClick={deleteHandler}>삭제</Button>
                      </div>
                    </div>
                  </div>
                }
            </div>
        }
      </div>
    </div>
  );
}

export default BoardDetail;