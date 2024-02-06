import React from 'react';
import Login from "../pagess/user/login/Login";
import SignUp from "../pagess/user/signUp/SignUp";
import Board from "../pagess/board/Board";
import BoardDetail from "../pagess/board/BoardDetail";

interface route {
  isNav: boolean,
  path: string,
  element: React.ReactElement;
}

const routes: route[] = [

  {
    isNav: false,
    path: "/login",
    element: <Login />
  },
  {
    isNav: false,
    path: "/sign-up",
    element: <SignUp />
  },
  {
    isNav: true,
    path: "/",
    element: <Board />
  },
  {
    isNav: true,
    path: "/:id",
    element: <BoardDetail />
  },
]

export default routes;