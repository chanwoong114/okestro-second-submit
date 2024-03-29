import React, {useContext, useState} from 'react';
import { Button, Modal } from 'antd';
import './BoardCreateModal.css'
import useBoard from "../../api/board";
import Input from "../input/input";
import InputText from "../input/InputText";
import {UpdateBoardDto} from "../../api/Dto/boardDto";
import {useIsLogin} from "../../context/context";
import ConfirmContext from "../../context/confirm/ConfirmContext";
import AlertContext from "../../context/alert/AlertContext";

interface modalInput {
  titleProps?: string | undefined,
  contentProps?: string | undefined,
  boardId?: number
}


function  BoardCreateModal ({titleProps, contentProps, boardId}: modalInput)  {
  const {alert} = useContext(AlertContext);
  const {confirm} = useContext(ConfirmContext);
  const { isLogin } = useIsLogin();
  const { createBoard, updateBoard } = useBoard();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState<string>(titleProps? titleProps : '');
  const [content, setContent] = useState<string>(contentProps? contentProps : '');

  const showModal = async () => {
    if (isLogin) {
      setOpen(true);
    } else {
      await alert('로그인 해야 글을 작성하실 수 있습니다.', true);
    }
  };

  const handleOk = async () => {
    if (boardId) {
      const isConfirm = await confirm("글 수정을 완료 하시겠습니까?")
      if (isConfirm) await updateBoard({boardId, title, content} as UpdateBoardDto)
      else return;
    } else {
      const isConfirm = await confirm("글 작성을 완료 하시겠습니까?")
      if (isConfirm) await createBoard({title, content})
      else return;
    }
    setOpen(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button className={'modal-button'} type={'text'} onClick={showModal}>
        {boardId? <span>수정</span> : <span>글 작성</span>}
      </Button>
      <Modal
        open={open}
        title={boardId? "게시글 수정" : "게시글 작성"}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            취소
          </Button>,
          <Button className={'modal-button'} key="submit" loading={loading} onClick={handleOk}>
            {boardId? <span>수정</span> : <span>작성</span>}
          </Button>,
        ]}
        width={1000}
        zIndex={50}
      >
        <form onSubmit={handleOk}>
          <Input label={'Title'} isPassword={false} onChange={setTitle} inputWord={title} placeholder={"이름를 입력하세요"}/>
          <InputText label={'Content'} isPassword={false} inputWord={content} placeholder={"내용을 입력하세요."}
                     onChange={setContent}/>
        </form>
      </Modal>
    </>
  );
};

export default BoardCreateModal;