const Usuario = require("../models/usuarioModel.js");


exports.create = (req, res, next) => {

    // Validação

    console.log("nome " + req.body.name);
    console.log("nome " + req.body.login);
    console.log("nome " + req.body.password);


    if(!req.body) {
        console.log("ENtrou aqui? controler create teste" + req.body.nome)
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const usuario = new Usuario({
        nome: req.body.name,
        login: req.body.login,
        senha: req.body.password
    });

    Usuario.create(usuario)
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


exports.login = (req, res) => {
    console.log("Chegou aqui login controller " + req.body.login + " - " + req.body.password)
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    

    const userLogin = {
        login: req.body.login,
        senha: req.body.password
    }
    
    Usuario.findByLoginSenha(userLogin)
        // .then(dataUserLogin => carregaDadosDesignacaoPessoa(dataUserLogin))
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving user."
            });
        });
}