import UsuarioService from "../services/UsuarioService";


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

export const loginUser = (login, password) => async () => {
    try {
        const res  = await UsuarioService.login({ login, password });

        // Aqui coloca os dispatchs para o redux

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}