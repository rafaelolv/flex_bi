import React from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';

import './style/Global.module.css';

import Header from './components/Header';
import Main from './pages/Main';
import FormPanelChart from './pages/FormPanelChart';
import UserDashboard from './pages/UserDashboard';
import Painel from './pages/Painel';
// import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FormUploadDados from './pages/FormUploadDados';
import PaginaGeraDadosJSON from './pages/PaginaGeraDadosJSON';



export default props => {
    return (
        <BrowserRouter>
            {/* <Painel /> */}
            {/* <Dashboard />
            <PaginaGeraDadosJSON /> */}
            <Header />
            <Routes>
                <Route exact path='/main' element={<Main />} />
                {/* <Route exact path='/login' element={<Login />} /> */}
                <Route exact path='/formChart' element={<FormPanelChart />} />
                <Route exact path={"/"} element={<Dashboard />} />
                <Route exact path={"/home"} element={<UserDashboard />} />
                <Route exact path={"/form"} element={<FormUploadDados />} />
                <Route exact path="/gerar" element={<PaginaGeraDadosJSON />} />
            </Routes>
        </BrowserRouter>
    )
};