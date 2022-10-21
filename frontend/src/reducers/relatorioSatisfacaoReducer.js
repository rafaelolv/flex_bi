import { RETRIEVE_RELATORIOS_SATISFACAO } from "../actions/actionTypes/relatorioSatisfacaoActionType";

const initialState = [];

function relatorioSatisfacaoReducer(relatorios = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVE_RELATORIOS_SATISFACAO:
            return payload;
    
        default:
            return relatorios;
    }
}

export default relatorioSatisfacaoReducer;