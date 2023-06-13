const Usuario = require("../models/usuarioModel.js");
const Dashboard = require("../models/dashboardModel.js");
const Grafico = require("../models/graficoModel.js")

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


// 
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

    const dadosUsuarioLogado = {
        usuario: {

        },
        dashboard: {
            
            graficos: {

            }
        }

    }
    
    // função encarregada de trazer os dados a serem carregados na dashboard, talvez mudar o nome
    Usuario.findByLoginSenha(userLogin)
        .then(dataUserLogin => {
            dadosUsuarioLogado.usuario = {...dataUserLogin};

            console.log("estou aqui hoje " + dataUserLogin.id_usuario);
            console.table(dadosUsuarioLogado.usuario);

            return carregaDadosDashboardByIdUser(dadosUsuarioLogado.usuario.id_usuario)
        })
        .then(dataDashboard => {

            console.log("dadosUsuarioLogado ---- " + dataDashboard);

            dadosUsuarioLogado.dashboard = {...dataDashboard}

            console.log("----dataDashboard ")
            console.table(dadosUsuarioLogado.dashboard);

            let data = {...dadosUsuarioLogado};
            
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving user."
            });
        });
}

// 
function carregaDadosDashboardByIdUser(idUser) {
    return new Promise( async (resolve, reject) => {
        try {
            let dashboard = {         
                
                graficos: {
        
                }
            }

            let dataResult = await Dashboard.findDashboard(idUser);      

            dashboard = {...dataResult};

            dataResult = await Grafico.findGraficosById(dashboard.id_dashboard); 
            dashboard.graficos = { ...dataResult };

            resolve(dashboard);
        } catch (err) {
            reject(err);
        }
    })
}


// 
function carregaDadosHomeUsuario(dataUserLogin) {
    

}