import UsuarioService from "../services/UsuarioService";
import { GET_DADOS_DASHBOARD } from "./actionTypes/dashboardActionTypes";


export const createUser = (name, login, password) => async () => {

    // console.log("createUser " + data);

    // console.log(Object.values(data));

    try {
        const res = await UsuarioService.create({ name, login, password });

        // Para quando for  usar o redux, e coloca dispatch lá no parenteses do async
        // dispatch({
        //     type: CREATE_TUTORIAL,
        //     payload: res.data,
        // });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const loginUser = (login, password) => async (dispatch) => {
    try {
        const res  = await UsuarioService.login({ login, password });

        console.log("res.data " + res.data.dashboard.graficos);
        console.table(res.data.dashboard);

        // dispatch({
        //     type: RETRIEVE_DASHBOARD,
        //     payload: res.data
        // });

        console.log("loginUser!!!!");

        dispatch({
            type: GET_DADOS_DASHBOARD,
            payload: res.data.dashboard
        });

        // Aqui coloca os dispatchs para o redux

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}