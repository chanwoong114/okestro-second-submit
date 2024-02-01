import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import routes from "../../front/src/route/routes";
import Navbar from "../../front/src/component/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}/>
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;