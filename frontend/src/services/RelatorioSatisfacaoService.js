import http from "../http-common";


const getAll = () => {
    return http.get("/relatoriosSatisfacao");
};


const RelatorioSatisfacaoService = {
    getAll
};

export default RelatorioSatisfacaoService;