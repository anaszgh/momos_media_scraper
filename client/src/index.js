import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import LoginComponent from './components/login/login.component';
import RegisterComponent from './components/register/register.component';
import MediaComponent from './components/media/media.component';
import AddComponent from './components/add/add.component';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
          <Route path="/" element={<LoginComponent />} />
          <Route path="register" element={<RegisterComponent />} />
          <Route path='media' element={<MediaComponent />} />
          <Route path='add' element={<AddComponent/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
