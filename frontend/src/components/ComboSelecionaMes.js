import React from "react";

import style from '../style/Dashboard.module.css';


const ComboSelecionaMes = ({mes, comboMeses, handleChangeMes}) => {

    const arrayComboMeses = [...comboMeses];
    console.log(arrayComboMeses);

    return (
        <div>
            <select className={style.styleSelect} value={mes}  onChange={handleChangeMes}>
                <option value={-1}>Todos</option>
                {arrayComboMeses && arrayComboMeses.map((mes) => {
                    return (<option key={mes[0]} value={mes[0]}>{mes[1]}</option>)    
                })}
            </select>
        </div>
    )
}

export default ComboSelecionaMes;