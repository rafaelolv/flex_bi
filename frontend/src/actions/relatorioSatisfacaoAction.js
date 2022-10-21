import { RETRIEVE_RELATORIOS_SATISFACAO } from "./actionTypes/relatorioSatisfacaoActionType";

import RelatorioSatisfacaoService from "../services/RelatorioSatisfacaoService";

import avaliacoesApi from './../dadosSimulados/avaliacoes';

export const retrieveRelatoriosSatisfacao = () => async (dispatch) => {
    try {
        // const res = RelatorioSatisfacaoService.getAll();

        const res = await JSON.parse(avaliacoesApi);
        const { avaliacoes } = res;

        dispatch({
            type: RETRIEVE_RELATORIOS_SATISFACAO,
            payload: avaliacoes,
        });
    } catch (err) {
        console.log(err);
    }
};
