import DashboardService from "../services/DashboardService";


export const createNewDashboard = (dashboard) => async () => {

    try {
        const res = await DashboardService.create(dashboard);

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