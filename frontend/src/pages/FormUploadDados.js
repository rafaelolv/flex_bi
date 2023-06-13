import React, { useState, useEffect } from "react";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import Bar from "../components/Bar";
import Footer from "../components/Footer";

import * as dfd from "danfojs";

import styleGlobal from '../style/Global.module.css';
import style from '../style/FormUploadDados.module.css';
import styleGraficos from '../style/GraficosDashboard.module.css';

import SelectOneOptionFilter from "../components/SelectOneOptionFilter";
import FilterSelect from "../components/FilterSelect";
import BarChart from "../graficos/BarChart";
import LineChart from "../graficos/LineChart";

import { Series, Dt } from "danfojs/dist/danfojs-base";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const FormUploadDados = () => {

    const initialFilter = [];

    const arrayLabelMonths = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const [itensFilter, setItensFilter] = useState([]);
    // const [item, setItem] = useState([]);
    const [filters, setFilters] = useState([]);

    const [fileData, setFileData] = useState([]);

    // const [chartValues, setChartValues] = useState([]);

    const [valuesChart, setValuesChart] = useState([]);
    const [labelsChart, setLabelsChart] = useState([]);
    

    let all = true;

    
    // Método encarregado de ler o arquivo EXCEL e selecionar os labels para carregar no list form
    const handleChangeFileUpload = (event) => {
        // const { value } = event.target;

        console.log(event.target.files[0]);

        dfd.readCSV(event.target.files[0])
            .then(df => {

                setFileData(df);
                // fileData = df;
                console.log("fileData ---- > ");
                console.log(fileData);
                const groupbySet = [];
                // talvez tenha que ser um map para poder  passar o name, ver se o map nao pega repetidos
                // groupbySet.push([...new Set(df['Segment'].values)]);
                // groupbySet.push([...new Set(df['State'].values)]);

                // Criar um método separado para fazer isso!!!! Está pegando os dados para serem carregados no select
                groupbySet.push(new Set([...new Set(df['Order Date'].values)].map((itemDate) => {
                    const date = new Date(itemDate);

                    return date.getFullYear();
                })));


                    let data ={'A': ['uau', 'uau', 'foo', 'bar',
                                    'foo', 'bar', 'foo', 'uau'],
                                'B': ['one', 'one', 'two', 'three',
                                        'two', 'two', 'one', 'three'],
                                'C': [1,3,2,4,5,2,6,7],
                                'D': [3,2,4,1,5,6,7,8]
                            }

                    let df2 = new dfd.DataFrame(data);

                    // let teste = df2.groupby(["A"]);

                    // teste.getGroup(["uau", "foo"])

                    // console.log(teste);


                    // df2.groupby(["A"]).getGroup(["uau"]).print();

                    // let grp = df2.groupby(["A", "B"]).getGroup(["uau", "three"]).column("C").sum();
                    // console.log(grp);

                console.log("groupbySet");
                console.table(groupbySet);

                setFilters([...groupbySet[0]].sort((a, b) => a - b));

                getValorTotalByYear(df);

            }).catch(err => {
                console.log(err);
            })
    }


    // Metodo de exemplo pegando o total de "sale" por "segment"
    const getDataSumByFilters = (dataList, itensFilterSelected, filters) => {
        
        let result = null;
        let labels = [];
        let values = [];

        if(all) {
            // let groups = dataList.groupby(["Segment", "State"]);
            // console.log(groups);
            // let col = groups.col(["Sales"]);

            let states = ["Florida", "California"];

            dataList['State'].print();
            // let loc = dataList.loc({columns: ["State", "Segment", "Sales"]});

            // let iloc = null;
            let rows1 = "";


                let loc = dataList.loc({columns: ["State", "Segment", "Sales"],
                                        // rows: ["Florida", "California"]
                });

            
                let iloc = loc.iloc({
                    rows: loc["State"].eq("Florida")
                })

            console.log(loc.columns);
            console.log(loc);
            
            loc.print();
            // loc.print();

            // let groups = dataList.groupby(["Segment", "State"]);
            let groups = iloc.groupby(["Segment", "State"]);

            console.log("groups");
            console.log(groups);

            groups.col(["Sales"]).sum().print();

            result = groups.col(["Sales"]).sum();
        }

        // console.log(result.$data[0][1]);

        result.$data.map((item) => {
            labels.push(item[0]);
            // console.log(item[0]);

            values.push(item[1]);
            // console.log(item[1]);
        })

        setLabelsChart(labels);
        setValuesChart(values);

        // setChartValues(result);

        console.log("Teste método");
        console.log(result);
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

    // const handleInputChange = event => {
    //     const { name, value } = event.target;
    //     setPrato({ ...prato, [name]: value });
    //   };


    // Recebe o item selecionado e chama o método que gera os valores totais pelo valor recebido
    // const handleItensFilter = (event) => {
    //     console.log(fileData);
    //     console.log(filters);
    //     console.log("Chamou????");

    //     const { name, value } = event.target;
        
    //     let nameArray = name;
    //     console.log(name + " - " + value + " -- " + nameArray);
    //     setItensFilter([...itensFilter,  nameArray = [...nameArray, value]]);

    //     getValorTotalByYear(fileData, value);

    //     console.log(">>> itensFilter " + itensFilter);
    // };

    const handleItemFilter = (event) => {
        
        const { name, value } = event.target;

        console.log("name and value:  " + name + "  " + value);

        getValorTotalByYear(fileData, value);
    }

    
    return (
        <div className={style.boxFormUploadDados}>
            <div>
                <section className={style.sectionFormUploadDados}>
                    <div>
                        <label htmlFor="image">
                            Adicione um arquivo no formato csv
                        </label><br/>
                        <input 
                            type="file"
                            id="myfile"
                            label="arquivo"
                            name="myfile"
                            // accept=".jpeg, .png, .jpg"
                            onChange={handleChangeFileUpload}
                        />
                    </div>
                </section>
            </div>
            
            <div>
                <SelectOneOptionFilter itens={filters} handleItemFilter={handleItemFilter} />
            </div>

            <div className={styleGraficos.divLineChart}>
                {/* <BarChart labels={labelsChart} dataValues={valuesChart}  /> */}
                <LineChart labels={labelsChart} dataValues={valuesChart} />
            </div>

            <Footer />
        </div>
    );
}

export default FormUploadDados;