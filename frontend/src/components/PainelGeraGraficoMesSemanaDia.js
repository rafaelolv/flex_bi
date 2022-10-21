import React from "react";

import ComboSelecionaMes from "./ComboSelecionaMes";

import style from '../style/Dashboard.module.css';


const PainelGeraGraficoMesSemanaDia = ({mes, comboMeses, inputPeriodoSemanasDias, handleChangeMes, handleChangeInputPeriodoSemanasDias, gerarGrafico}) => {

    return (
        <div className={style.styleControlPainelGeraGraficoMesSemanaDia}>
            <ComboSelecionaMes mes={mes} comboMeses={comboMeses} handleChangeMes={handleChangeMes} />

            {/* <div value={inputPeriodoSemanasDias} onChange={handleChangeInputPeriodoSemanasDias}>
                <input disabled={mes == -1} type="radio" value="semanas" name="periodoSemanasDias" /> Semanas
                <input disabled={mes == -1} type="radio" value="dias" name="periodoSemanasDias" /> Dias
            </div> */}

            <div className={style.styleBoxToggleRadioButton} value={inputPeriodoSemanasDias} onChange={handleChangeInputPeriodoSemanasDias}>
                <label className={`${inputPeriodoSemanasDias == 'semanas' ? style.activeSwitch : style.switch}`} >
                    <input disabled={mes == -1} type="radio" value="semanas" name="periodoSemanasDias" />
                    <span>Semanas</span>
                </label>
                <label className={`${inputPeriodoSemanasDias == 'dias' ? style.activeSwitch : style.switch}`}>
                    <input disabled={mes == -1} type="radio" value="dias" name="periodoSemanasDias" />
                    <span>Dias</span>
                </label>
            </div>

            <button className={style.styleBotaoFiltar} onClick={gerarGrafico}>
                Filtrar
            </button>
        </div>
    );
}

export default PainelGeraGraficoMesSemanaDia;