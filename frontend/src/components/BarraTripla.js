import React, { useState } from "react";

import style from '../style/GraficosDashboard.module.css';

const BarraTripla = ({avaliacao}) => {

	return (
		<div className={style.barraTripla}>
			{/* <div>{avaliacao.nome}</div> */}
			<div>{avaliacao.otimo}</div>
			<div>{avaliacao.bom}</div>
			<div>{avaliacao.regular}</div>
		</div>
	);
}

export default BarraTripla;