import React, { useState } from "react";
import { useDispatch } from "react-redux";

import BarChart from "../graficos/BarChart";
import ModalFormDashboard from '../components/ModalFormDashboard';
import FormUploadDadosCSV from "../components/FormUploadDadosCSV";

import imgGraficoBarrasHorizontal from '../images/imgGraficobarrashori.PNG';
import imgGraficoBarline from '../images/imgGraficoBarLine.PNG';

import { createGrafico } from "../actions/graficoAction";

import style from '../style/FormPanelChart.module.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const styleMui = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


// Página de cadastro de gráficos que aparecerão na dashboard do usuário
const FormPanelChart = () => {

    // Dados que viram previamente do banco, ver ainda se é isso mesmo, como vai fazer 
    const initialStateGrafico = {
        id_grafico: null,
        id_dashboard: 1,
        tipo: 'valor_geral_tempo'
    }

    // Dados a serem inserios pelo usuário no form
    const initialStateDadosGrafico = {
        id_itens_grafico: null,
        id_grafico: null,
        label: "",
        valor: "",
        filtro: []
    };


    // 
    const [grafico, setGrafico] = useState(initialStateGrafico);

    //Para cadastro de graficos em uma dashboard existente
    const [dadosGrafico, setDadosGrafico] = useState(initialStateDadosGrafico);

    // A idéia é que sirva para setar os dados extraidos do CSV, ainda ver isso
    const [dadosApiCSV, setDadosApiCSV] = useState("");

    const dispatch = useDispatch();


    // 
    const handleInputChangeGrafico = event => {
        const { name, value } = event.target;
        setGrafico({ ...grafico, [name]: value });
    };

        
    // Método que captura a entrada(o que é inserido) no input
    const handleInputChangeDadosGrafico = event => {
        const { name, value } = event.target;
        setDadosGrafico({ ...dadosGrafico, [name]: value });
    };


    // Método usado para pegar e retornar uma dashboard
    function getDashboard(dashboard) {
        return dashboard;
    }


    // 
    const cadastrarGrafico = () => {

        console.log("cadastrarGrafico");
        console.table(grafico);

        const newGrafico = {
            grafico: grafico,
            dadosGrafico: dadosGrafico
        }

        dispatch(createGrafico(newGrafico))
            .then(data => {
                setDadosGrafico(data.dadosGrafico);

            })
            .catch(e => {
                console.log("ERRO: " + e);
            });

            setDadosGrafico(initialStateDadosGrafico);
    }

    // 
    const recebeDadosFromApiCSV = (dados) => {
        setDadosApiCSV(dados);
    }



    return (
        <section className={style.box}>

            {/* Modal cadastro da dashboard  */}
            <ModalFormDashboard getDashboard={getDashboard} />
    
            <section className={style.areaFormChart}>
                <div>
                    {/* <h1>Área form gráficos</h1>
                    <h1>Quais valores deverão ser apresentados nos gráficos?</h1> */}
                    <img src={imgGraficoBarrasHorizontal} />
                    <div className={style.areaFormChart}>
                        <input type="text"
                            id="label"
                            name="label"
                            placeholder="Label"
                            required
                            value={dadosGrafico.label}
                            onChange={handleInputChangeDadosGrafico}
                        />
                        <input type="text"
                            id="valor"
                            name="valor"
                            placeholder="Valor"
                            required
                            value={dadosGrafico.valor}
                            onChange={handleInputChangeDadosGrafico}
                        />
                        <input type="text"
                            id="filtro"
                            name="filtro"
                            placeholder="Filtros"
                            required
                            value={dadosGrafico.filtro}
                            onChange={handleInputChangeDadosGrafico}
                        />
                    </div>
                    {/* <button type="submit" onClick={addValue}>
                        Add
                    </button> */}
                    <button type="submit" onClick={cadastrarGrafico}>
                        Cadastrar
                    </button>
                </div>
                {/* <div>
                    <img src={imgGraficoBarline} />
                    <div className={style.areaFormChart}>
                        <input></input>
                    </div>
                </div> */}
            </section>
            {/* <FormUploadDadosCSV configValues={valores} recebeDadosFromApiCSV={recebeDadosFromApiCSV}/> */}
            {/* <section className={style.areaChart}>
                <div>
                    <h1>Grafico carregado</h1>
                    <BarChart />
                </div>
            </section> */}
        </section>
    )
};

export default FormPanelChart;