const sql = require("../config/config/db.js");

// constructor
const Dashboard = function(dashboard) {
    this.nome = dashboard.nome;
    this.id_usuario = dashboard.id_usuario
};


// 
Dashboard.create = (newDashboard) => {

    console.log("model de dashboard");
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
Dashboard.findDashboard = (idUser) => {

    console.log("chegou aqui findDashboard ????");

    return new Promise(async (resolve, reject) => {
        try {
            const queryFindDashboard = 'select * from dashboard where (id_usuario = ?)';
            const result = await executeQuery(sql, queryFindDashboard, idUser);
            const data = result[0];

            console.log("data  " + data);
            console.table(data);

            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
}


Dashboard.carregaDadosDashboardByIdUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {

            console.log("idUser " + idUser);

            const queryCarregaDashboard = 'select * from usuario u inner join dashboard d on d.id_usuario = ?' +
                ' inner join graficos g on g.id_dashboard = d.id_dashboard' +
                ' inner join itens_grafico i on i.id_grafico = g.id_grafico';
            
            // const queryDashboard = 


            const result = await executeQuery(sql, queryCarregaDashboard, idUser);
            const data = result[0];

            console.table(data);
            console.log(data);


            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
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