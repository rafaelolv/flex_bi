import { React } from 'react';

import VisorBarraSuperior from './VisorBarraSuperior';

import style from '../style/Dashboard.module.css';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import BadgeIcon from '@mui/icons-material/Badge';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';


const BarraDadosSuperior = ({ countProdutos, countCategorias }) => {

    console.log(">>>>>>>>>> BarraDadosSuperior >>>>>>>>>>> = " + countProdutos);
    console.log(">>>>>>>>>> countProdutos >>>>>>>>>>> = " + countProdutos);
    
    const infoVisorBarraSuperior = {

        produtos: {
            icone: ProductionQuantityLimitsIcon,
            legenda: "N° de produtos",
        },
        categorias: {
            icone: CategoryIcon,
            legenda: "N° de categorias",
        },
        funcionarios: {
            icone: BadgeIcon,
            legenda: "N° de funcionários",
        },
        dias: {
            icone: HourglassTopIcon,
            legenda: "Dias para o fim do mês",
        }
    }

    return (
        <header className={style.BarraDadosSuperior}>
            <VisorBarraSuperior countDados={countProdutos} infoVisorBarraSuperior={infoVisorBarraSuperior.produtos} />
            <VisorBarraSuperior countDados={countCategorias} infoVisorBarraSuperior={infoVisorBarraSuperior.categorias} />
            <VisorBarraSuperior countDados={"20"} infoVisorBarraSuperior={infoVisorBarraSuperior.funcionarios} />
            <VisorBarraSuperior countDados={"10"} infoVisorBarraSuperior={infoVisorBarraSuperior.dias} />
            {/* <div>Número de produtos</div>
            <div>funcionários</div>
            <div>Número de alguma outra coisa</div> */}
        </header>
    )
}

export default BarraDadosSuperior;