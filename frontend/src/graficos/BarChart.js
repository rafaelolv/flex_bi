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



// import style from '../style/GraficosDashboard.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ labels, values }) => {

    console.log("Values ");
    console.log(values);
    console.log(labels);

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
                data: values,
                backgroundColor: '#6A5ACD',
            },
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default BarChart;