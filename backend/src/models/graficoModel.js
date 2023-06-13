const sql = require("../config/config/db.js");


// constructor
const Grafico = function(grafico) {
    this.grafico = grafico.grafico;
    this.dadosGrafico = grafico.dadosGrafico;
};


// 
Grafico.create = (newGrafico) => {

    return new Promise (async (resolve, reject) => {
        try {
            const data = {
                grafico: "",
                dadosGrafico:""
            }

            const queryCreateGrafico = 'INSERT INTO graficos SET ?';
            const queryCreateItensGrafico = 'INSERT INTO itens_grafico SET ?'
            const {grafico, dadosGrafico} = newGrafico;

            const resultGrafico = await executeQuery(sql, queryCreateGrafico, grafico);
            data.grafico = {...grafico, id_grafico: resultGrafico.insertId};

            data.dadosGrafico = {...dadosGrafico, id_grafico: data.grafico.id_grafico}

            const resultItensGrafico = await executeQuery(sql, queryCreateItensGrafico, data.dadosGrafico);  

            data.dadosGrafico = {...data.dadosGrafico, id_itens_grafico: resultItensGrafico.insertId};

            resolve(data);

        } catch (err) {
            reject(err);
        }
    });
}

// Retorna os graficos encontrados pelo id passado
Grafico.findGraficosById = (id_dashboard) => {

    console.log("findGraficosById????");

    return new Promise(async (resolve, reject) => {
        try {
            const queryFindGraficos =
            'select g.*, i.* from dashboard d' + 
            ' inner join graficos g on g.id_dashboard = ?' +
            ' inner join itens_grafico i on g.id_grafico = i.id_grafico';
            const result = await executeQuery(sql, queryFindGraficos, id_dashboard);
            const data = result[0];

            console.log("data graficos  " + data);
            console.table(data);

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

module.exports = Grafico;