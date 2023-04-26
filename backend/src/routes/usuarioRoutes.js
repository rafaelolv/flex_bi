module.exports = app => {
    const usuarioController = require("../controllers/usuarioController");
    
    console.log("Chegou aqui em routes!");

    var router = require("express").Router();

    router.post("/", usuarioController.create);

    // router.get("/", usuarioController.findAll);

    router.post("/login", usuarioController.login);

    app.use('/atacarejobi/usuarios', router);
}; 