module.exports = app => {
    const relatoriosSatisfacao = require("../controllers/relatorioSatisfacaoController.js");

    var router = require("express").Router();
    
    router.get("/", relatoriosSatisfacao.getAll);


    app.use('/atacarejobi/relatoriosSatisfacao', router);
};