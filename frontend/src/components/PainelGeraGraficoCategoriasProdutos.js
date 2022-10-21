import React from "react";

import ComboSelecionaMes from "./ComboSelecionaMes";

import style from '../style/Dashboard.module.css';

const PainelGeraGraficoCategoriasProdutos = ( {gerarGrafico, handleChangeMes, handleChangeCategoria, comboMeses, comboCategorias, mes, categoria} ) => {

    const arrayComboMeses = [...comboMeses];
    const arrayComboCategorias = [...comboCategorias];

    return (
        <div className={style.styleControlPainelGeraGraficoProdutosCategorias}>
            {/* <ComboSelecionaMes mes={mes} handleChangeMes={handleChangeMes} listaComboMeses={comboMeses} /> */}
            <div>
                <select className={style.styleSelect} value={mes}  onChange={handleChangeMes}>
                    {arrayComboMeses && arrayComboMeses.map((mes) => {
                        return (<option key={mes[0]} value={mes[0]}>{mes[1]}</option>)    
                    })}
                </select>
            </div>
            <div>
                <select className={style.styleSelect} value={categoria} onChange={handleChangeCategoria}>
                    <option value="Todas">Todas</option>
                    {arrayComboCategorias && arrayComboCategorias.map((categoria, index) => {
                        return (<option key={index} value={categoria}>{categoria}</option>)    
                    })}
                </select>
            </div>
            <div className={style.styleBoxToggleRadioButton}>
                <label className={style.switch}>
                    <input disabled={mes == -1} type="radio" value="semanas" name="periodoSemanasDias" />
                    <span>Semanas</span>
                </label>
                <label className={style.switch}>
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

export default PainelGeraGraficoCategoriasProdutos;