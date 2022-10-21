import React from 'react';
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

import style from '../style/GraficosDashboard.module.css';
         
import { generateAbsoluteValuesByMonth, generateRelativeValuesByMonth } from './../actions/produtoAction';


const GraficoProdutosLucroAbsolutoRelativo = ({ mesesProdutos }) => {

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
    
    // const arrayRelativeValues = generateRelativeValuesByMonth(mesesProdutos);
    const arrayAbsoluteValues = generateAbsoluteValuesByMonth(mesesProdutos);

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Valores absolutos dos produtos vendidos',
        },
      },
    };

  // const labels = arrayRelativeValues && arrayRelativeValues.map((data) => {
  //   return data.nome;
  // })

  const labels = arrayAbsoluteValues && arrayAbsoluteValues.map((data) => {
    return data.nome;
  })

  const data = {
      labels,
      datasets: [
          {
              label: 'Valores absolutos',
              data: arrayAbsoluteValues && arrayAbsoluteValues.map((data) => {
                // console.log(data.valorRelativo);
                return data.valorAbsoluto;
              }),
              backgroundColor: '#e3347b',
          },
      ],
  };

    

  return (
      <div className={style.divGraficoProdutosLucroAbsolutoRelativo}>
          <Bar options={options} data={data} />
      </div>
  )
}

export default GraficoProdutosLucroAbsolutoRelativo;