import { React } from 'react';

import style from '../style/Dashboard.module.css';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

import { white } from '@mui/material/colors';


const VisorBarraSuperior = ({ countDados, infoVisorBarraSuperior }) => {

    return (
        <div className={style.styleVisorBarraSuperior}>
            <div className={style.styleImagemVisorBarraSuperior}>
                <infoVisorBarraSuperior.icone style={{ color: "white" }}
                />
            </div>
            <div className={style.styleInfoVisorBarraSuperior}>
                <h1>{countDados}</h1>
                <h3>{ infoVisorBarraSuperior.legenda }</h3>
            </div>
        </div>
    )
}

export default VisorBarraSuperior;