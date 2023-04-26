import GraficoService from "../services/GraficoService";


export const createGrafico = (grafico) => async () => {

    try {
        const res = await GraficoService.create(grafico);

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