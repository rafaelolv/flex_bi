import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import style from '../style/GraficosDashboard.module.css';


const GraficoBarraProdutos = ({ produtosCompraVenda }) => {

    const [produtosMes, setProdutosMes] = useState([]);
   
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Valores de compra e venda dos produtos no mês!',
            },
        },
        scales: {
            y: {
                // max: 100,
                min: 0,
                // ticks: {
                //     stepSize: 0.5
                // }
            }
        },
    };

    const arrayCompraEVenda = produtosCompraVenda.slice(0, 8);

    const labels = arrayCompraEVenda && arrayCompraEVenda.map((obj) => {
        return obj.nome;
    })

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Valor de compra',
                data: arrayCompraEVenda && arrayCompraEVenda.map((obj) => {
                    return obj.valorCompra;
                }),

                backgroundColor: '#e3347b',
            },
            {
                label: 'Valor de venda',
                data: arrayCompraEVenda && arrayCompraEVenda.map((obj) => {
                    return obj.valorVenda;
                }),

                backgroundColor: '#6A5ACD',
            },
        ],
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    return (
        <div className={style.divGraficoProdutosCompraVenda}>
            <Bar options={options} data={data} />
        </div>
    )
}

export default GraficoBarraProdutos;