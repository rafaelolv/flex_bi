const sql = require("../config/config/db.js");

// constructor
const Dashboard = function(dashboard) {
    this.nome = dashboard.nome;
    this.id_usuario = dashboard.id_usuario
};


// 
Dashboard.create = (newDashboard) => {

    console.log("mode de dashboard");
    // const {nome, login, senha} = newUsuario;

    return new Promise (async (resolve, reject) => {
        try {
            //-Pessoa e contato-------------------------------COMUM A TODOS
            const queryCreateDashboard = 'INSERT INTO dashboard SET ?';
            const {nome, id_usuario} = newDashboard;

            console.log(nome + " " + id_usuario);

            const resultDashboard = await executeQuery(sql, queryCreateDashboard, {nome, id_usuario});
            const data = {...newDashboard, id_dashboard: resultDashboard.insertId};

            resolve(data);

        } catch (err) {
            reject(err);
        }
    });
}

// 
const executeQuery = async (con, query, params) => {
    return new Promise ((resolve, reject) => {
        con.query(query, params, (err, res) => {
            if(err) {
                return reject(err);
            }
            // console.log(Object.values(res));
            return resolve(res);
        });
    });
}

module.exports = Dashboard;