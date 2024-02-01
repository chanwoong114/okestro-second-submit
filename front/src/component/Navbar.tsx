import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link key={"메인"} to={"/"} >
        메인
      </Link>
      <Link to="/login">
        <p>로그인</p>
      </Link>
      <Link to="/sign-up">
        <p>회원가입</p>
      </Link>
      <Link to="/board">
        <p>게시판</p>
      </Link>
    </div>
  );
}

export default Navbar;