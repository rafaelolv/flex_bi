import http from "../http-common";


// const getAll = () => {
//     return http.get("/relatoriosSatisfacao");
// };

const create = (data) => {
    console.log("Chegou aqui 1 createe serviceeee! " + data);
    console.log(Object.values(data));

    return http.post("/usuarios", data);
}

const login = (data) => {
    console.log("CCCCCCCCChegou service aqui 1 login!!!!!!!");
    return http.post("/usuarios/login", data);
}

const UsuarioService = {
    create,
    login
};

export default UsuarioService;