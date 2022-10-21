import React, {useEffect, useState, useCallback } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// import { getMetaMes } from './../actions/produtoAction';

import DoughnutAndamentoPorcentagem from './DoughnutAndamentoPorcentagem';
import ComboSelecionaMes from '../components/ComboSelecionaMes';
import PainelGeraGraficoMesSemanaDia from '../components/PainelGeraGraficoMesSemanaDia';

import style from '../style/GraficosDashboard.module.css';


ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);

const MultiChartBarLine = ({ allProducts, comboMeses, getDadosContainerDoughnut }) => {

    console.log("222222 --- Passou aqui! multichartBarLine");
    // Armazena os valores totais de cada barra(mês). 
    const [chartData, setChartData] = useState([]);

    // 
    const [meta, setMeta] = useState(0);
    // valoresTotaisMeses antes era usado e agora esta sendo usado dataValues para unificar, ver se usa ainda ou nao, ou pelo menos melhorar o nome  que  passado para o Doughnut
    // const [valoresTotaisMeses, setValoresTotaisMeses] = useState([]);

    // 
    const TodosMeses = -1;
    
    //Input mês 
    const [mesEscolhido, setMesEscolhido] = useState(TodosMeses);

    // variável que guarda o valor total do mês escolhido pelo usuário no combo de meses 
    const [valoresTotaisMeses, setValoresTotaisMeses] = useState([]);

    // 
    const [inputPeriodoSemanasDias, setInputPeriodoSemanasDias] = useState(null);

    // Legendas com o nome do mês em cada barra, também usado no combo de seleção de mês do painel.
    const [labelMeses, setLabelMeses] = useState([]);


    // Valores Totais de cada barra(mês).
    const [dataValues, setDataValues] = useState([]);

    const [produtos, setProdutos] = useState([]);

    
    // const carregaDadosMultiChartBarLine = useCallback(() => {
    //     getMetaVendaProdutosByMes(11, allProducts);
    // })
    
    // 
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    // TESTA O USECALLBACK AQUI NO LUGAR DO USEEFFECT

    // Eram usados 2 useEffects, um neste componente e outro no componente pai (Dashboard), sendo que esse que ficava aqui nao  funcinava da forma correta, pois a hieraquia do mais interno para o mais externo, 
    // ativando primeiro o useEffect daqui e em seguida o do Dashboard, onde carrega os dados do redux, onde assim os dados passados  para este nao funcionavam de primeira, pois esse aqui ja tinha sido renderizado.

    // o problema é o useEffect, quando tiro ele e coloco os dados nao dinâmicos, essa página carrega normal
    useEffect(() => {
        console.log("22222 --- Passou aqui detrno do useefect!");
        console.log("---------Entrou no useEffect de MultiChartBarLine????????????");

        // carregaDadosMultiChartBarLine();

        if(allProducts.length == 0) {
            console.log("entrou nesse if de teste de allProducts.length === 0");
            return;
        }

        gerarValorTotalMes(allProducts);
        console.log("-----------------------------apos o gerar vlaor do multi---------------------------?????????");

        console.log(allProducts);
    
    }, [allProducts]);

    // useEffect(() => {
    //     console.log("---------Entrou no useEffect de MultiChartBarLine  -2-  ????");
    //     console.log(Object.values(allProducts));
        
    //     carregaDadosMultiChartBarLine();
    
    // }, [mesEscolhido, allProducts]);

    // useEffect(() => {
    //     console.log("---------Entrou no useEffect de MultiChartBarLine  -2-  ????");
    //     console.log(Object.values(allProducts));
        
    //     getMetaVendaProdutosByMes(11, allProducts);
    
    // }, [mesEscolhido]);


    // 
    const handleChangeMes = (event) => {
        setMesEscolhido(event.target.value);
    }


    // 
    const handleChangeInputPeriodoSemanasDias = (event) => {
        setInputPeriodoSemanasDias(event.target.value);
    }
    

    // 
    // Depois tentar extrair o código que gera o label das semanas para um método separado.
    const gerarValorTotalSemanasByMes = (produtos, mes, ano) => {
        const diasFimDeMes = [28, 29, 30, 31];
        let ultimoDiaSemana = false;
        let diaCorrente = null;
        let totalSemana = 0;
        let inicioSemana = true;
        let labelDaSemana = "";
        const arrayTotalSemanas = [];
        const arrayLabelsBarrasSemanas = [];
        const ultimoDiaMes = getQuantidadeDiasDoMes(ano, mes);
        let finalDoMes = true;

        produtos.forEach(produto => {
            if(produto.data.getMonth() == mes) {
                // ver se é o final de uma semana
                if(produto.data.getDate() == ultimoDiaMes && finalDoMes) {
                    labelDaSemana = labelDaSemana.concat(" - ", String(ultimoDiaMes));
                    arrayLabelsBarrasSemanas.push(labelDaSemana);
                    diaCorrente = produto.data.getDate();
                    finalDoMes = false;

                } else if (produto.data.getDay() === 6 && ultimoDiaSemana === false)  {
                    diaCorrente = produto.data.getDate();
                    ultimoDiaSemana = true;
                }
                if(ultimoDiaSemana && produto.data.getDate() !== diaCorrente) {
                    arrayTotalSemanas.push(totalSemana);
                    labelDaSemana = labelDaSemana.concat(" - ", String(diaCorrente));
                    arrayLabelsBarrasSemanas.push(labelDaSemana);
                    labelDaSemana = "";
                    totalSemana = 0;
                    ultimoDiaSemana = false;
                }
                // verifica se é inicio da semana
                if(produto.data.getDate() === 1 || produto.data.getDay() === 0) {
                    labelDaSemana = String(produto.data.getDate());
                    diaCorrente = produto.data.getDate();
                }

                totalSemana = totalSemana + produto.valorTotal;            }
        });
        // Quer dizer que a semana terminou com o fim  do mês e não no sábado
        if(diaCorrente === ultimoDiaMes) {
            arrayTotalSemanas.push(totalSemana);
        }

        const datasets = [
            {
                type: 'bar',
                label: 'Valor alcançado',
                backgroundColor: 'rgb(75, 192, 192)',
                data: arrayTotalSemanas,
                borderColor: 'white',
                borderWidth: 2,
            },
        ];

        setChartData(datasets);
        setLabelMeses(arrayLabelsBarrasSemanas);
    }


    //Retorna a quantidade de dias do mês, 28, 29, 30 ou 31.
    // getMonth é de 0 a 11, ele recebe um  mês de 0 a 11, mas precisa do mês de 1 a 12 para o new Date.
    function getQuantidadeDiasDoMes(ano, mes) {
        mes = Number(mes) + 1;
        var data = new Date(ano, mes, 0);
        return data.getDate();
    }


    // Função 
    // function getValorTotalMesByMes(meses, listaValoresTotaisMeses, mesEscolhido) {
    //     const valoresTotaisMeses = new Map();

    //     meses.forEach((mes, index) => {
    //         listaValoresTotaisMeses.set(mes, valoresTotaisMeses[index]);
    //     });

    //     return valoresTotaisMeses.get(mesEscolhido);
    // }

    
    // 
    const gerarValorTotalMes = (allProducts) => {

        console.log("--------------------------------------->>>>>>>>Entrou aqui no geraValortotal???? >>>>>> " + allProducts);

        // Array com o valor total de cada mês que irá ficar em cada barra
        const valoresTotaisPorMes = [];
        const labelsMeses = [];
        const labelsMetaMes = [];
        let dataValuesMetaMes = null;

        for (let i = 0; i <= 11; i++) {
            let total = null;
            allProducts.forEach(produto => {
                if(produto.data.getMonth() == i) {
                    total = total + produto.valorTotal;

                    if(dataValuesMetaMes == null) {
                        dataValuesMetaMes = produto.metaMes;
                    }
                }
            })

            if(total != null) {
                valoresTotaisPorMes.push(total);
                labelsMeses.push(meses[i]);
                labelsMetaMes.push(dataValuesMetaMes);
                dataValuesMetaMes = null;
            }
        }

        setValoresTotaisMeses(valoresTotaisPorMes);
        console.log("------------------------------------------------------valoresTotaisPorMes ==== " + valoresTotaisPorMes);
        console.log("valoresTotaisMeses ==== " + valoresTotaisMeses);
        // setTeste(valoresTotaisPorMes[2]);
        getDadosContainerDoughnut(getValorTotalMesEscolhido(valoresTotaisPorMes));
        console.log("----------------------------------- aqui?????--------------")

        const datasets = [
            {
                type: 'line',
                label: 'Meta',
                borderColor: '#E3347B',
                backgroundColor: '#E3347B',
                borderWidth: 2,
                fill: false,
                data: labelsMetaMes,
            },
            {
                type: 'bar',
                label: 'Valor alcançado',
                backgroundColor: '#00C5E0',
                data: valoresTotaisPorMes,
                borderColor: 'white',
                borderWidth: 2,
            },
        ];

        setChartData(datasets);
        setLabelMeses(labelsMeses);
    }
    

    // 
    const gerarValorTotalPorDiaByMes = (produtos, mes) => {
        const arrayTotaisPorDias = [];
        const arraylabelTotaisPorDia = [];
        let totalDia = 0;
        let diaCorrente = null;

        const arrayMesEscolhido = produtos.filter((produto) => {
            // ver aqui pq quando usa === nao  dá certo
            return produto.data.getMonth() == mes;
        })

        arrayMesEscolhido.forEach(produto => {
            if(diaCorrente !== null && diaCorrente !== produto.data.getDate()) {
                arrayTotaisPorDias.push(totalDia);
                arraylabelTotaisPorDia.push(diaCorrente);
                totalDia = 0;
            }
            diaCorrente = produto.data.getDate();
            totalDia = totalDia + produto.valorTotal;
        });
        arrayTotaisPorDias.push(totalDia);
        arraylabelTotaisPorDia.push(diaCorrente);

        const datasets = [
            {
                type: 'bar',
                label: 'Valor alcançado',
                backgroundColor: 'rgb(75, 192, 192)',
                data: arrayTotaisPorDias,
                borderColor: 'white',
                borderWidth: 2,
            },
        ];

        setChartData(datasets);
        setLabelMeses(arraylabelTotaisPorDia);
    }


    // Método que gera um gráfico de acordo com as opções escolhidas.
    const gerarGrafico = () => {

        if(inputPeriodoSemanasDias === "semanas" && mesEscolhido != TodosMeses) {
            console.log("Em semanas - mes = " + mesEscolhido);
            console.log("valoresTotaisMeses === " + valoresTotaisMeses);
            gerarValorTotalSemanasByMes(allProducts, mesEscolhido, 22);
            getDadosContainerDoughnut(getValorTotalMesEscolhido(valoresTotaisMeses));

        } else if(inputPeriodoSemanasDias === "dias"  && mesEscolhido != TodosMeses) {
            console.log("Em dias - mes = " + mesEscolhido);
            gerarValorTotalPorDiaByMes(allProducts, mesEscolhido);
            getDadosContainerDoughnut(getValorTotalMesEscolhido(valoresTotaisMeses));
        } else {
            gerarValorTotalMes(allProducts);
            getDadosContainerDoughnut(getValorTotalMesEscolhido);
        }
    }


    // 
    const getValorTotalMesEscolhido = (arrayValoresTotaisMes) => {

        const data = {
            arrayValoresTotaisMes: arrayValoresTotaisMes,
            mes: mesEscolhido,
        }
        return data;
    }


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Valores totais ao longo dos meses!',
            },
        },
        // scales: {
        //     y: {
        //         max: 50000,
        //         min: 0,
        //         // ticks: {
        //         //     stepSize: 0.5
        //         // }
        //     }
        // },
    };


    const data = {
        labels: labelMeses,
        datasets: chartData,
    };


    return (
            <>
                <div className={style.divGraficoMultiChartBarLine} >
                    <div className={style.graficoMultiChartBarLine}>
                        <Chart type='bar' options={options} data={data} />
                    </div>
                    <PainelGeraGraficoMesSemanaDia mes={mesEscolhido} inputPeriodoSemanasDias={inputPeriodoSemanasDias} comboMeses={comboMeses}
                        handleChangeMes={handleChangeMes} handleChangeInputPeriodoSemanasDias={handleChangeInputPeriodoSemanasDias} gerarGrafico={() => gerarGrafico()} />
                </div>
            </>
    );
}

export default MultiChartBarLine;