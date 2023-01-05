import React from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';

import './style/Global.module.css';

import Painel from './pages/Painel';
import Dashboard from './pages/Dashboard';
import FormUploadDados from './pages/FormUploadDados';
import PaginaGeraDadosJSON from './pages/PaginaGeraDadosJSON';


export default props => {
    return (
        <BrowserRouter>
            {/* <Painel /> */}
            {/* <Dashboard />
            <PaginaGeraDadosJSON /> */}
            <Routes>
                <Route exact path={"/"} element={<Dashboard />} />
                <Route exact path={"/form"} element={<FormUploadDados />} />
                <Route exact path="/gerar" element={<PaginaGeraDadosJSON />} />
            </Routes>
        </BrowserRouter>
    )
};