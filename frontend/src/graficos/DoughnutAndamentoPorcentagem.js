import { React } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import VisorPorcentagemCentroDoughnut from '../graficos/DoughnutAndamentoPorcentagem';

import style from '../style/GraficosDashboard.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutAndamentoPorcentagem = ({ andamentoPorcentagemMetaMes }) => {

    const andamentoPorcentagem = andamentoPorcentagemMetaMes[0] >= 100 ? [100, 0] : andamentoPorcentagemMetaMes;

    const labels = [];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Meta a ser batida no mês',
                data: andamentoPorcentagem,
                backgroundColor: [
                    // 5c2092
                    '#00C5E0',
                    '#E3347B'
                ],
                hoverOffset: 4,
                borderWidth: 4,
                borderColor: "lightgray"
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            // title: {
            //     display: true,
            //     text: 'Andamento do mês',
            // },
        }
    };

    return (
        <>
            {/* <div className={style.divVisorPorcentagemCentroDoughnut}>
                <p>{andamentoPorcentagemMetaMes[0]}</p>
            </div> */}
            {/* <VisorPorcentagemCentroDoughnut andamentoPorcentagemMetaMes={andamentoPorcentagemMetaMes[0]} /> */}
            <div className={style.divGraficoDoughnutAndamentoPorcentagem}>
                <div className={style.divVisorPorcentagemCentroDoughnut}>
                    <p>{andamentoPorcentagemMetaMes[0] > 100 ? 100 + "%" : andamentoPorcentagemMetaMes[0] + "%"}</p>
                </div>
                <Doughnut options={options} data={data} />
            </div>
        </>
    )
}

export default DoughnutAndamentoPorcentagem;