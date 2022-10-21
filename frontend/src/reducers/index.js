import painelReducer from "./painelReducer";
import relatorios from "./relatorioSatisfacaoReducer";
import produtos from "./produtoReducer";
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    painelReducer: painelReducer,
    relatorios: relatorios,
    produtos: produtos
});