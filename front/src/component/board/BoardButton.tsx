import { PlusOutlined, TeamOutlined, EditOutlined } from '@ant-design/icons';
import React, {useState} from 'react';
import { FloatButton } from 'antd';

const BoardButton: React.FC = () => {

  const [open, setOpen] = useState(false);

  function onChange() {
    setOpen(!open)
    console.log(open)
  }
  return (
    <div>
      <FloatButton.Group
        trigger="click"
        type="primary"

        style={{ right: 40 }}
        icon={<PlusOutlined />}
      >
        <FloatButton icon={<EditOutlined />} tooltip={<div>작성하기</div>}/>
        <FloatButton icon={<TeamOutlined />} tooltip={<div>작성한 글 보기</div>}/>
      </FloatButton.Group>
    </div>
  )
};

export default BoardButton;