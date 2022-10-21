import React, {useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

import PainelGeraGraficoCategoriaProdutos from './../components/PainelGeraGraficoCategoriasProdutos';

import style from '../style/GraficosDashboard.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GraficoAndamentoProdutosCategorias = ({allProducts, listaCategorias, comboMeses}) => {

    const [valores, setValores] = useState([]);
    const [labels, setLabels] = useState([]);
    const [mes, setMes] = useState(9);
    const [categoria, setCategoria] = useState("Todas");


    // 
    const carregaValoresTotaisCategoriaByMes = useCallback(() => {
        gerarValoresTotaisCategoriasByMes(allProducts, mes, listaCategorias);
    })

    // 
    useEffect(() => {
        console.log("------ - Useeffect GraficoAndamentoProdutosCategorias ---  ");

        if(allProducts.length === 0) {
            return;
        }

        console.log(allProducts);
        carregaValoresTotaisCategoriaByMes();
    }, [allProducts]);


    //
    const handleChangeMes = (event) => {
        setMes(event.target.value);
    }

    //
    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    }


    // Método que contabiliza os valores totais de cada categoria no mês escolhido.
    const gerarValoresTotaisCategoriasByMes = (allProducts, mes, listaCategorias) => {
        let valorTotalCategoriaMes = 0;
        const valoresTotaisCategorias = [];

        listaCategorias.forEach(categoria => {
            allProducts.forEach((produto) => {
                if(produto.data.getMonth() == mes && produto.categoriaNome === categoria) {
                    valorTotalCategoriaMes = valorTotalCategoriaMes + produto.valorTotal;
                }
            });
            valoresTotaisCategorias.push(valorTotalCategoriaMes);
            valorTotalCategoriaMes = 0;
        });
        setLabels([...listaCategorias]);
        setValores(valoresTotaisCategorias);
    }

    // Ajeitar que só aceita com letra maiúscula
    // Método que contabiliza os valores totais por produto da categoria  escolhida e no mês escolhido.
    const gerarValoresTotaisProdutosByCategoriaMes = (allProducts, mes, categoria) => {

        const valoresProdutosByCategoria = [];
        const labelsProdutos = [];

        allProducts.forEach((produto) => {
            if(produto.data.getMonth() == mes && produto.categoriaNome === categoria) {

                let posicao = labelsProdutos.indexOf(produto.nome);
                if(posicao === -1) {
                    labelsProdutos.push(produto.nome);
                    valoresProdutosByCategoria.push(produto.valorTotal);
                }
                else if (posicao > -1) {
                    valoresProdutosByCategoria[posicao] = valoresProdutosByCategoria[posicao] + produto.valorTotal;
                }
            }
        });
        setLabels(labelsProdutos);
        setValores(valoresProdutosByCategoria);

        // allProducts.forEach((produto) => {
        //     if(produto.data.getMonth() === mes && produto.categoriaNome === categoria) {

        //     }
        // })
    }

    // 
    const gerarGrafico = () => {
        if(categoria === "Todas") {
            gerarValoresTotaisCategoriasByMes(allProducts, mes, listaCategorias);
        } else {
            gerarValoresTotaisProdutosByCategoriaMes(allProducts, mes, categoria);
        }
    }


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Andamento dos produtos vendidos no mês',
            },
        },
    };


    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Valor vendido até o momento',
                data: valores,
                backgroundColor: '#6A5ACD',
            },
        ],
    };


  return (
      <div className={style.divGraficoAndamentoProdutosCategorias}>
        <div className={style.graficoAndamentoProdutosCategorias}>
            <Bar options={options} data={data} />
        </div>
        <PainelGeraGraficoCategoriaProdutos gerarGrafico={() => gerarGrafico()} handleChangeMes={handleChangeMes} 
            handleChangeCategoria={handleChangeCategoria} comboMeses={comboMeses} comboCategorias={listaCategorias} mes={mes} categoria={categoria} />
      </div>
  )
}

export default GraficoAndamentoProdutosCategorias;