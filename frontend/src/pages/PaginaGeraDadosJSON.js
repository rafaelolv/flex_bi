import { React } from 'react';


const PaginaGeraDadosJSON = () => {

    console.log("chegou?");

    const gerarValoresDefault = () => {

        let produtosGerados = []
        const d = new Date("2022-10-01");
        let dia = 1;
        let mes = 6;

        // valorTotal corresponde ao valor total de vendas na data, valorVenda * a quantidade de itens daquele produto, onde ao final do dia é contabilizado no 
        // valorTotal. valorTotal: valor total  do que foi vendido em R$ daquele produto no dia.
        let produtos = [
            {data: d, valorTotal: '', nome: "cerveja", valorVenda: 8, valorCompra: 6, categoriaNome: "Bebidas" }, 
            {data: d, valorTotal: '', nome: "agua", valorVenda: 8, valorCompra: 6, categoriaNome: "Bebidas" },
            {data: d, valorTotal: '', nome: "energetico", valorVenda: 8, valorCompra: 6, categoriaNome: "Bebidas" },
            {data: d, valorTotal: '', nome: "feijão", valorVenda: 8, valorCompra: 6, categoriaNome: "Alimentos" },
            {data: d, valorTotal: '', nome: "arroz", valorVenda: 8, valorCompra: 6, categoriaNome: "Alimentos" },
            {data: d, valorTotal: '', nome: "macarrão", valorVenda: 8, valorCompra: 6, categoriaNome: "Alimentos" },
            {data: d, valorTotal: '', nome: "sabão", valorVenda: 8, valorCompra: 6, categoriaNome: "Limpeza" },
            {data: d, valorTotal: '', nome: "desinfetante", valorVenda: 8, valorCompra: 6, categoriaNome: "Limpeza" },
            {data: d, valorTotal: '', nome: "água sanitária", valorVenda: 8, valorCompra: 6, categoriaNome: "Limpeza" },
        ];
        // d.setMonth(8);
        // d.setDate(dia);

        for (let i = 1; i <= 30; i++) {

            if(i == 35) {
                dia = 0;
                d.setMonth(mes++);
            }

            console.log("1 " + d + "------ " + d.getMonth());
            
            produtos.forEach(produto => {
                produtosGerados = [...produtosGerados, {...produto, data: d.toString(), valorTotal: Math.floor(Math.random() * 200)}];
            });

            d.setDate(dia++);
        }
        console.log("produtosGerados ");
        console.log(Object.values(produtosGerados));

        return produtosGerados;
    }

    return (
        <div>
            <h1>Gerar dados de produtos para o JSON</h1>
            <button onClick={gerarValoresDefault}>
                Gerar dados
            </button>
        </div>
    )
}

export default PaginaGeraDadosJSON;