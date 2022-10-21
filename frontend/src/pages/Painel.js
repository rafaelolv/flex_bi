import React, { Component, Fragment } from 'react';

import Barra from '../components/Barra';

import style from '../style/Painel.module.css';


class Painel extends Component {
    constructor(props) {
        super(props);

        const heineken = {
            nome: 'Heineken',
            preco: 10,
            qtdMes: [1202, 3000, 3009, 2000, 2390, 1990, 1874, 800, 587, 3111, 700, 5000],
            meta: 5000
        }
        const petra = {
            nome: 'Petra',
            preco: 8,
            qtdMes: [2200, 3210, 2000, 1000, 1560, 1890, 4000, 1600, 650, 1230, 900, 4000],
            meta: 6000
        }
        const devassa = {
            nome: 'Devassa',
            preco: 7,
            qtdMes: [3200, 5000, 3743, 4245, 1240, 5450, 3000, 5900, 5772, 2999, 800, 7000],
            meta: 7000
        }

        this.state = {
            qtd: 12,
            produtos: [heineken, petra, devassa],
            valor: null,
        };
    }

    gerarGraficoQuatidadeMes(produto) {
        console.log("Cerveja: " + produto.nome)
        const barras = produto.qtdMes.map(qtd => {
            return this.calculaPercentual(qtd, produto.meta)
        });

        return barras;
    }

    gerarGraficoValorTotalMes(produto) {
        const barras = produto.qtdMes.map(qtd => {
            return this.calculaValorTotalMensal(qtd, produto)
        });
        return barras;
    }

    gerarGraficoProdutosMaisVendidos(produto) {
        console.log("Cerveja: " + produto.nome)
        let totalAnual = produto.qtdMes.reduce((total, qtd) => {
            return total + qtd;
        })
        console.log("total " + totalAnual)
        return this.calculaPercentual(totalAnual, 12*produto.meta)
    }
    
    calculaValorTotalMensal(qtd, produto) {
        let valorPercentual = ((100 * qtd) / produto.meta);
        let valorMensal = qtd * produto.preco;
        
        const percentual = {
            height: valorPercentual,
        } 

        return <Barra porcentagem={percentual} valorMes={valorMensal} />
    }

    calculaPercentual(valor, valorBase) {
        let valorPercentual = ((100 * valor) / valorBase);
        const percentual = {
            height: valorPercentual,
        }
        return <Barra porcentagem={percentual} valorPercentual={valorPercentual} />
    }

    // gerarVariacaoPercentualMes(produto) {
    //     console.log("Cerveja: " + produto.nome)
    //     const barras = produto.qtdMes.map(qtd => {
    //         return this.calculaVariacaoPercentual(qtd, produto.meta)
    //     });

    //     return barras;
    // }

   
    // calculaVariacaoPercentual(qtd, valorBase) {
    //     if(this.state.valor === null) {
    //         this.setState({
    //             valor: qtd,
    //         })
    //         return this.calculaPercentual(qtd, valorBase)
    //     } else {
    //         if(this.state.valor < qtd) {
    //             let variacao
    //         } else {

    //         }
    //     }
    // }


    render() {
        return(
            <div className={style.painel}>
                <div className={style.blocoGraficos}>
                    {React.Children.toArray(this.state.produtos.map(value => (
                        <div>
                            <div className={style.cabecalhoGraficos}>
                                <h1>{value.nome}</h1>
                                <p>Quantidade de produtos vendidos em cada mês</p>
                            </div>
                            <div className={style.grafico}>
                                {this.gerarGraficoQuatidadeMes(value)}
                            </div>
                            <div className={style.legendaMeses}>
                                <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
                                <span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span>
                            </div>
                        </div>
                    )))}
                </div>
                <div className={style.blocoGraficos}>
                    {React.Children.toArray(this.state.produtos.map(value => (
                        <div>
                            <div className={style.grafico}>
                                {this.gerarGraficoValorTotalMes(value)}
                            </div>
                            <div className={style.legendaMeses}>
                                <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
                                <span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span>
                            </div>
                        </div>
                    )))}
                </div>
                <div className={style.blocoGraficos}>
                    <div className={style.grafico}>
                        {React.Children.toArray(this.state.produtos.map(value => (
                                this.gerarGraficoProdutosMaisVendidos(value)
                        )))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Painel;