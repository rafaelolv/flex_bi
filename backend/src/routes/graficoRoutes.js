module.exports = app => {
    const graficoController = require("../controllers/graficoController");
    var router = require("express").Router();
    
    console.log("Chegou aqui em routes!");


    router.post("/", graficoController.create);

    // router.get("/", usuarioController.findAll);

    // router.post("/login", usuarioController.login);

    app.use('/atacarejobi/graficos', router);
}; 