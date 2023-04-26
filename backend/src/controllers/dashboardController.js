const Dashboard = require("../models/dashboardModel.js");


exports.create = (req, res, next) => {

    console.log("req " + req.body.nome);
    // Validação

    // console.log("nome " + req.body.name);
    // console.log("nome " + req.body.login);
    // console.log("nome " + req.body.password);


    if(!req.body) {
        // console.log("ENtrou aqui? controler create teste" + req.body.nome)
        res.status(400).send({
            message: "Content can not be empty!"
        });
        console.log("ENtrou aqui? controler create teste" + req.body.nome)
        return;
    }

    const dashboard = new Dashboard({
        nome: req.body.nome,
        id_usuario: 1,
    });

    Dashboard.create(dashboard)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the person."
            });
        });
};