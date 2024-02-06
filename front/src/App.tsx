import React, {useEffect} from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import routes from "../../front/src/route/routes";
import Navbar from "../../front/src/component/Navbar";
import Cookies from "js-cookie";
import LoginCheck from "./context";


function App() {

  useEffect(() => {
    if (!Cookies.get('accessToken')) {

    } else {

    }
  }, []);

  return (
    <div className={'App'} style={{fontFamily: 'Pretendard-medium'}}>
      <LoginCheck>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element}/>
            ))}
          </Routes>
        </BrowserRouter>
      </LoginCheck>
    </div>
  );
}
export default App;