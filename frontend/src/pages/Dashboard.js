import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import GraficoBarraTripla from '../components/GraficoBarraTripla';
import BarraDadosSuperior from '../components/BarraDadosSuperior';
import GraficoBarraProdutos from './../graficos/GraficoBarraProdutos';
import GraficoProdutosLucroAbsolutoRelativo from './../graficos/GraficoProdutosLucroAbsolutoRelativo';
import MultiChartBarLine from './../graficos/MultiChartBarLine';
import GraficoAndamentoProdutosCategorias from './../graficos/GraficoAndamentoProdutosCategorias';
import ContainerDoughnut from './../components/ContainerDoughnut';
import Bar from "../components/Bar";
import Footer from "../components/Footer";

// import { retrieveRelatoriosSatisfacao } from "../actions/relatorioSatisfacaoAction";
import { retrieveAllProducts, generateAbsoluteValuesByMonth } from './../actions/produtoAction';

import styleGlobal from '../style/Global.module.css';
import style from '../style/Dashboard.module.css';
import styleGraficos from '../style/GraficosDashboard.module.css';


const Dashboard = () => {

    const [produtos, setProdutos] = useState([]);
    const [produtosValorAbsoluto, setProdutosValorAbsoluto] = useState([]);
    const [dadosContainerDoughnut, setDadosContainerDoughnut] = useState({});
    const [dadosBarraSuperior, setDadosBarraSuperior] =  useState({});
    // const [comboCategorias, setComboCategorias] = useState([]);

    // 
    const TodosMeses = -1;

    // 
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const listaProdutos = useSelector(state => state.produtos);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(retrieveAllProducts());
        
        setProdutos(listaProdutos);
    }, []);

    
    // Método para carregar os nomes das categorias no combo de seleção de categoria.
    const carregarComboSelecionaCategoria = (listaProdutos) => {

        const valoresComboCategorias = new Set();
        listaProdutos.forEach(produto => {
            valoresComboCategorias.add(produto.categoriaNome);
        });

        return valoresComboCategorias;
    }

    // 
    const carregaComboSelecionaMes = (listaProdutos, meses) => {

        const comboMeses = new Map();
        listaProdutos.forEach(produto => {
            comboMeses.set(produto.data.getMonth(), meses[produto.data.getMonth()]);
        });

        return comboMeses;
    }


    // 
    function getDadosContainerDoughnut(callBack) {
        let data = callBack;
        let arrayMesesCombo = [...comboMeses];

        console.log(arrayMesesCombo);

        let indexMesEscolhido = arrayMesesCombo.findIndex((value) => {

            return value[0] == data.mes;
        })

        getDadosBarraSuperior(listaProdutos, data.mes);

        const indexMesAtual = arrayMesesCombo[arrayMesesCombo.length - 1];
        const mesAtual = indexMesAtual[0];
  
        setDadosContainerDoughnut({
            mesEscolhido: data.mes == TodosMeses ? mesAtual : data.mes,
            valorTotalMesEscolhido: indexMesEscolhido == TodosMeses ? data.arrayValoresTotaisMes[arrayMesesCombo.length - 1] : data.arrayValoresTotaisMes[indexMesEscolhido]
        });
    }

    
    // ***********Depois ajeitar essa gambiarra que foi feita com mes, a matriz mesesEmUso, tentar ajeitar depois para ficar melhor entendivel! 
    const getDadosBarraSuperior = (produtos, mesEscolhido) => {
        
        const setProdutos = new Set();
        const setCategorias = new Set();
        // comboMeses é um map [ 9, "Outubro" ], .... chave e valor
        const mesesEmUso = [...comboMeses];

        const indexMesAtual = mesesEmUso[mesesEmUso.length - 1];
        const mesAtual = indexMesAtual[0];
        
        const mes = mesEscolhido == TodosMeses ? mesAtual : mesEscolhido;
        console.log(">>> mes get dados barra superior " + mes);
        const arrayMes = produtos.filter((produto) => {
            // ver aqui pq quando usa === nao  dá certo

            return produto.data.getMonth() == mes;
        })

        arrayMes.forEach(produto => {
            setProdutos.add(produto.nome);
            setCategorias.add(produto.categoriaNome);
        })

        setDadosBarraSuperior({
            countProdutos: [...setProdutos].length, 
            countCategorias: [...setCategorias].length
        });
    }

    console.log(">>>>>>>>> setDadosBarraSuperior " + dadosBarraSuperior.countProdutos);
    console.log(">>>> " + dadosContainerDoughnut.mesEscolhido);
    const comboMeses = carregaComboSelecionaMes(listaProdutos, meses);
    const comboCategorias = carregarComboSelecionaCategoria(listaProdutos);
    

    return (
        <div className={style.dashBoard}>
            <div>
                <section className={style.sectionProdutos}>
                    <BarraDadosSuperior countProdutos={dadosBarraSuperior.countProdutos} countCategorias={dadosBarraSuperior.countCategorias} />
                    <ContainerDoughnut allProducts={listaProdutos} mesEscolhido={dadosContainerDoughnut.mesEscolhido} valorTotalMesEscolhido={dadosContainerDoughnut.valorTotalMesEscolhido} />
                    <MultiChartBarLine allProducts={listaProdutos} comboMeses={comboMeses} getDadosContainerDoughnut={getDadosContainerDoughnut}/>
                    <GraficoAndamentoProdutosCategorias allProducts={listaProdutos} listaCategorias={comboCategorias} comboMeses={comboMeses} />
                    <GraficoBarraProdutos produtosCompraVenda={listaProdutos} />
                    <GraficoProdutosLucroAbsolutoRelativo mesesProdutos={listaProdutos} />
                </section>
                {/* <section className={style.sectionAvaliacoes}>
                    <div>Algum grafico relacionado a relatoriosatisfacao</div>
                    <GraficoBarraTripla />
                </section> */}
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;