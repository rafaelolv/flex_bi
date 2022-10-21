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

import { generateAbsoluteValuesByMonth } from './../actions/produtoAction';


const GraficoProdutosLucroAbsolutoRelativo = ({ mesesProdutos }) => {
    
    console.log("---- " + Object.values(mesesProdutos));
    const arrayAbsoluteValues = generateAbsoluteValuesByMonth(mesesProdutos);

    console.log("-- " + Object.values(arrayAbsoluteValues));

    const labels = arrayAbsoluteValues && arrayAbsoluteValues.filter((data) => {
        return data["nome"] === "nome";
    })

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Valor absoluto',
                data: arrayAbsoluteValues && arrayAbsoluteValues.filter((data) => {
                    return data["valorAbsoluto"] === "valorAbsoluto";
                }),

                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
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

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    return (
        <div className={style.divGraficoProdutosLucroAbsolutoRelativo}>
            <Bar options={options} data={data} />
        </div>
    )
}

export default GraficoProdutosLucroAbsolutoRelativo;