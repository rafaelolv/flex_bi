import React from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';

import './style/Global.module.css';

import Header from './components/Header';
import Painel from './pages/Painel';
import FormUserRegister from './pages/FormUserRegister';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FormUploadDados from './pages/FormUploadDados';
import PaginaGeraDadosJSON from './pages/PaginaGeraDadosJSON';
import FormPanelChart from './pages/FormPanelChart';


export default props => {
    return (
        <BrowserRouter>
            {/* <Painel /> */}
            {/* <Dashboard />
            <PaginaGeraDadosJSON /> */}
            <Header />
            <Routes>
                <Route exact path='/userRegister' element={<FormUserRegister />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path={"/"} element={<Dashboard />} />
                <Route exact path={"/form"} element={<FormUploadDados />} />
                <Route exact path="/gerar" element={<PaginaGeraDadosJSON />} />
                <Route exact path='/formChart' element={<FormPanelChart />} />
            </Routes>
        </BrowserRouter>
    )
};