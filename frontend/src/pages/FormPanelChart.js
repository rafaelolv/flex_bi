import React, { useState } from "react";
import { useDispatch } from "react-redux";

import imgGraficoBarrasHorizontal from '../images/imgGraficobarrashori.PNG';
import imgGraficoBarline from '../images/imgGraficoBarLine.PNG';
import BarChart from "../graficos/BarChart";
import FormUploadDadosCSV from "../components/FormUploadDadosCSV";

import { createNewDashboard } from "../actions/dashboardAction";
import { createGrafico } from "../actions/graficoAction";

import style from '../style/FormPanelChart.module.css';



const FormPanelChart = () => {

    const initialStateDadosDashboard = {
        nome: "",
        id_usuario: "",
        dadosGrafico: {}
    }

    const initialStateGrafico = {
        id_dashboard: 2,
        tipo: 'valor_total_tempo'
    }

    const initialStateDadosGrafico = {
        label: "",
        valor: "",
        filtro: []
    };

    //Para cadastro da dashboard o dos graficos que a irao compor inicialmente
    const [dashboard, setDashboard] = useState(initialStateDadosDashboard);

    // 
    const [grafico, setGrafico] = useState(initialStateGrafico);

    //Para cadastro de graficos em uma dashboard existente
    const [dadosGrafico, setDadosGrafico] = useState(initialStateDadosGrafico);
    const [dadosApiCSV, setDadosApiCSV] = useState("");

    const dispatch = useDispatch();


    // 
    const handleInputChangeDadosDashboard = event => {
        const { name, value } = event.target;
        setDashboard({ ...dashboard, [name]: value });
    };

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


    // 
    const cadastrarNovaDashBoard = () => {
        
        dispatch(createNewDashboard(dashboard))
            .then(data => {
                setDashboard(data);

                console.log("resposta then " + dashboard.nome);
                console.log("resposta then " + dashboard.id_usuario);
                console.log("resposta then " + data.id_usuario);
                console.log("resposta then " + data.id_dashboard);

                console.log(dashboard.dadosGrafico.label);
                console.log("SUCCESS: Nova Dashboad cadastrada com sucesso!");
            })
            .catch(e => {
                console.log("ERRO: " + e);
            });

        // navigate("/formChart");

        console.log("--->Dash " + dadosGrafico.label);
        console.log("---> " + dadosGrafico.valor);
        console.log("---> " + dadosGrafico.filtros);

    }


    // 
    const cadastrarGrafico = () => {

        console.log("cadastrarGrafico");

        const newGrafico = {
            grafico: grafico,
            dadosGrafico: dadosGrafico
        }

        dispatch(createGrafico(newGrafico))
            .then(data => {
                setDadosGrafico(data.dadosGrafico);

                console.log("resposta then " + data.dadosGrafico.label);
                // console.log(dadosGrafico.label);
            })
            .catch(e => {
                console.log("ERRO: " + e);
            });

        // navigate("/formChart");

        // console.log("---> " + dadosGrafico.label);
        // console.log("---> " + dadosGrafico.valor);
        // console.log("---> " + dadosGrafico.filtros);
    }

    // 
    const recebeDadosFromApiCSV = (dados) => {
        setDadosApiCSV(dados);
    }



    return (
        <section className={style.box}>

            {/* Provisoriamente aqui, a ideia é colocar essa parte do form do nome da dashboard em uma janela modal  */}
            <div>
                <input type="text"
                    id="nome"
                    name="nome"
                    placeholder="Nome dashboard"
                    required
                    value={dashboard.nome}
                    onChange={handleInputChangeDadosDashboard}
                />
                <button type="submit" onClick={cadastrarNovaDashBoard}>
                    Cadastrar nova Dashboard !!!!
                </button>
            </div>
    
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