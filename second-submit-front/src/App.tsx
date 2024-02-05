import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import routes from "../../front/src/route/routes";
import Navbar from "../../front/src/component/Navbar";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}/>
        ))}
      </Routes>
    </div>
  );
}

export default App;
