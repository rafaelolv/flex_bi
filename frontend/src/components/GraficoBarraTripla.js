import React, { useState, useEffect, useCallback  } from "react";
import { useDispatch, useSelector } from "react-redux";

import { retrieveRelatoriosSatisfacao } from "../actions/relatorioSatisfacaoAction";
import BarraTripla from "./BarraTripla";

import style from '../style/GraficosDashboard.module.css';

const GraficoBarraTripla = () => {

	// 150 funcionarios
    const relatorios = useSelector(state => state.relatorios);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(retrieveRelatoriosSatisfacao());
    }, []);

    const buildBarraTripla = (obj) => {
        let data = '';
        Object.keys(obj).forEach((item) => {
            data = {...data, [item]: obj[item]};
        })
        return data;
    }

	return (
        <div className={style.graficoBarraTripla}>       
            {relatorios && relatorios.map((element, index) => (  
                <BarraTripla avaliacao={ buildBarraTripla(element) } key={index}/>
            ))}
        </div>
	);
}

export default GraficoBarraTripla;