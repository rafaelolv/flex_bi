import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Series, Dt } from "danfojs/dist/danfojs-base";
import * as dfd from "danfojs";



const UserDashboard = () => {

    const arrayLabelMonths = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const [valuesChart, setValuesChart] = useState([]);
    const [labelsChart, setLabelsChart] = useState([]);

    const dashboard = useSelector(state => state.dashboard);

    console.log("UserDashboard");
    console.table(dashboard);


    function carregaDadosDashboardByCSV(event) {
        console.log(event.target.files[0]);

        dfd.readCSV(event.target.files[0])
            .then(df => {

                

                // getValorTotalByYear(df);

            }).catch(err => {
                console.log(err);
            })
    }

    // Gera os valores totais por mês com base no ano escolhido no "select", por default já caso nao tiver nenhum ano escolhido, os dados apresentados são reunindo todos os anos
    const getValorTotalByYear = (fileData, selectedYear) => {

        console.log("selectedYear:  " + selectedYear);
        
        let arrayDatas = fileData["Order Date"].values;

        // Esse valor vai mudar dependendo do que for selecionado no listItens 
        let defaultYearValue = 0;
        let sale = fileData["Sales"].values;
        const valuesPerMonth = new Array(12).fill(0);

        let year = selectedYear != null ? selectedYear : defaultYearValue; 

        console.log("--------> " + year);
       

        let sf_rep = fileData["Order Date"].values;

        if(year !== 0) {
            [...sf_rep].forEach((item, index) => {

                const date = new Date(item);
    
                if(date.getFullYear() == year) {
    
                    valuesPerMonth[date.getMonth()] = valuesPerMonth[date.getMonth()] + sale[index];
                }
            })
        } else {
            [...sf_rep].forEach((item, index) => {

                const date = new Date(item);
    
                valuesPerMonth[date.getMonth()] = valuesPerMonth[date.getMonth()] + sale[index];
            })
        }

        

        setLabelsChart(arrayLabelMonths);
        setValuesChart(valuesPerMonth);
    }


    // 
    function buildingCharts() {
        
    }


    return  (
        <main>
            <h1>Dashboard do usuário: {dashboard.nome}</h1>
        </main>
    )
}

export default UserDashboard;