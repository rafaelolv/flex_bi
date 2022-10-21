const API = require("../models/relatorioSatisfacaoApi.js");

exports.getAll = (req, res) => {
    
    API.carregaDadosRelatorioSatisfacao()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving relatorios."
            });
        });
};