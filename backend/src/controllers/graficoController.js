const Grafico = require("../models/graficoModel.js");


exports.create = (req, res, next) => {

    console.log("graficoController");
    console.table(req.body);
    console.table(req.body.dadosGrafico);

    if(!req.body) {
        // console.log("ENtrou aqui? controler create teste" + req.body.nome)
        res.status(400).send({
            message: "Content can not be empty!"
        });
        console.log("ENtrou aqui? controler create teste" + req.body)
        return;
    }

    const grafico = new Grafico({
        grafico: req.body.grafico,
        dadosGrafico: req.body.dadosGrafico
    });


    Grafico.create(grafico)
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