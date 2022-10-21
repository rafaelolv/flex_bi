module.exports = (sequelize, Sequelize) => {
    const RelatorioSatisfacao = sequelize.define("relatorioSatisfacao", {
        nome: {
            type: Sequelize.STRING
        }
    });
    return RelatorioSatisfacao;
};