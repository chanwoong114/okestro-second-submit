import React from 'react';
import {Link} from "react-router-dom";
import symbol from "../etc/image/SYMBOL.png";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useIsLogin} from "../context";
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate();
  const {isLogin, setIsLogin} = useIsLogin();

  const Logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    setIsLogin(false);
  }

  return (
    <div className={'nav-div'}>
      <div className={'container navbar'}>
        <Link key={"메인"} to={"/"}>
          <img className={'logo-img'} src={symbol} width={'200px'} onClick={() => navigate(`/`)}/>
        </Link>
        {!isLogin ?
          <div className={'right-div'}>
            <Link className={'Link Link-left'} to="/login">
              <p>Login</p>
            </Link>
            <p className={'wall'}>벽</p>
            <Link className={'Link'} to="/sign-up">
              <p>Sign Up</p>
            </Link>
          </div> :
          <div className={'right-div'}>
            <p className={'right-div-p'} onClick={Logout}>Logout</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Navbar;