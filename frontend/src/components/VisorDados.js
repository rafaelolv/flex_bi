import { React } from 'react';

import style from '../style/GraficosDashboard.module.css';


const VisorDados = ({ dadosVisorContainerDoughnut }) => {

    return (
        <div className={style.visorDados}>
            <div>
                <h1>{ dadosVisorContainerDoughnut.descricao }</h1>
                <h2>{ dadosVisorContainerDoughnut.valor }</h2>
            </div>
        </div>
    )
}

export default VisorDados;