import React, { useState, useEffect } from 'react';

import VisorDados from './VisorDados';
import DoughnutAndamentoPorcentagem from '../graficos/DoughnutAndamentoPorcentagem';

import { getMetaMes } from './../actions/produtoAction';

import style from '../style/GraficosDashboard.module.css';


const ContainerDoughnut = ({ allProducts, mesEscolhido, valorTotalMesEscolhido }) => {
    
    console.log("___________ContainerDoughnut_______________");

    if(mesEscolhido == undefined) {
        console.log(">>>>>>>>>>>>>>> allProducts ta igual a 0 e = " + mesEscolhido);
        return;
    } 
    

    // Fazer algo para quando a meta já tiver sido atingida, ou seja, quando já tiver dado mais de 100% no andamentoPorcentagemMetaMes, quando da mais, a barra nao aparece.
    // 
    const calculaAndamentoMeta = (valorTotalMes) => {

        console.log(">>>>>>>>>>>>>>>> === " + mesEscolhido + " -- " + allProducts.length);

        const meta = getMetaVendaProdutosByMes(mesEscolhido, allProducts);
        
        console.log("valorTotalMes doughnut  ---- = " + valorTotalMes);
        console.log("meta  " + meta);

        const porcentagemMetaMes = [];
        let metaMesValorPorcentagemAlcancada = 0;
        let metaMesValorPorcentagemRestante = 0;

        // Nesse caso, por enquanto, esta sendo pego o valor alcançado no mês, correspondente ao último mês, que esta na posição 2 do array lista  
        let metaValorR$AlcancadoMes = valorTotalMes;  

        metaMesValorPorcentagemAlcancada = Math.floor(valorTotalMes/meta * 100);

        porcentagemMetaMes.push(metaMesValorPorcentagemAlcancada.toFixed(2));
        metaMesValorPorcentagemRestante = (100 - porcentagemMetaMes[0]);
        porcentagemMetaMes.push(metaMesValorPorcentagemRestante.toFixed(2));

        // setAndamentoPorcentagemMetaMes(porcentagemMetaMes);
        return porcentagemMetaMes;
    }


    // 
    function getMetaVendaProdutosByMes(mes, produtos) {
        console.log("----1--- getMetaMes 1 ---- = " + mes + " - " + produtos);
        let metaRetornada = getMetaMes(mes, produtos);

        // setMeta(metaRetornada);

        return metaRetornada;
    }


    // 
    const gerarValoresVisorDados = (media, porcentagemAlcancada, porcentagemRestanteParaAlcancar) => {

        console.log("porcentagemAlcancada, porcentagemRestanteParaAlcancar  = " + porcentagemAlcancada + porcentagemRestanteParaAlcancar)

        let metaMes = getMetaMes(mesEscolhido, allProducts);        
        
        // Ver o que colocar quando a o valor já estiver além dos 100% da meta alcançada

        return [{descricao: "Meta do mês", valor: "R$ " + metaMes },
                {descricao: "Porcentagem Alcançada", valor: porcentagemAlcancada + "%"}, 
                {descricao: "Média", valor: "R$ " + media }, 
                {descricao: "Porcentagem Restante", valor: porcentagemRestanteParaAlcancar + "%"},
                {descricao: "Meta do mês", valor: "R$ " + metaMes },
                {descricao: "Porcentagem Alcançada", valor: porcentagemAlcancada + "%"}, 
                {descricao: "Média", valor: "R$ " + media }, 
                {descricao: "Porcentagem Restante", valor: porcentagemRestanteParaAlcancar + "%"},
            ];
    }

    const andamentoPorcentagemMetaMes = calculaAndamentoMeta(valorTotalMesEscolhido);

    console.log(">>>>>>>>>>>>>>>>>> " + andamentoPorcentagemMetaMes);

    // gerarValoresVisorDados(1800, andamentoPorcentagemMetaMes[0], andamentoPorcentagemMetaMes[1]);

    const arrayValoresVisor = gerarValoresVisorDados(1800, andamentoPorcentagemMetaMes[0], andamentoPorcentagemMetaMes[1]);

    return (
        <div className={style.containerDoughnut}>
            <DoughnutAndamentoPorcentagem andamentoPorcentagemMetaMes={andamentoPorcentagemMetaMes} />
            {arrayValoresVisor.map((data) => (
                <VisorDados dadosVisorContainerDoughnut={data} />
            ))}
        </div>
    )
}

export default ContainerDoughnut;