import React from 'react';
import Login from "../pagess/user/login/Login";
import SignUp from "../pagess/user/signUp/SignUp";
import Board from "../pagess/board/Board";
import BoardDetail from "../pagess/board/BoardDetail";

interface route {
  path: string,
  element: React.ReactElement;
}

const routes: route[] = [

  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/",
    element: <Board />
  },
  {
    path: "/:id",
    element: <BoardDetail />
  },
]

export default routes;