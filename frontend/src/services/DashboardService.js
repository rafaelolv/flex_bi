import http from "../http-common";

const create = (data) => {
    console.log("Chegou aqui 1 createe serviceeee! " + data);
    console.log(Object.values(data));

    return http.post("/dashboard", data);
}


const DashboardService = {
    create
};

export default DashboardService;