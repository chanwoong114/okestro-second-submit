import React from 'react';
import Main from "../pagess/user/Main";
import Login from "../pagess/user/Login";
import SignUp from "../pagess/user/SignUp";
import Board from "../pagess/board/Board";
import BoardDetail from "../pagess/board/BoardDetail";

interface route {
  path: string,
  element: React.ReactElement;
}

const routes: route[] = [
  {
    path: "/",
    element: <Main />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/board",
    element: <Board />
  },
  {
    path: "/board/:id",
    element: <BoardDetail />
  },
]

export default routes;