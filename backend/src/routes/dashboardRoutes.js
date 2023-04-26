module.exports = app => {
    const dashboardController = require("../controllers/dashboardController");
    
    console.log("Chegou aqui em routes!");

    var router = require("express").Router();

    router.post("/", dashboardController.create);

    // router.get("/", usuarioController.findAll);

    // router.post("/login", usuarioController.login);

    app.use('/atacarejobi/dashboard', router);
}; 