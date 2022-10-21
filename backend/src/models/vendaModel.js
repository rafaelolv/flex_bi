module.exports = (sequelize, Sequelize) => {
    const Venda = sequelize.define("venda", {
        data: {
            type: Sequelize.DATE
        },
        valorTotal: {
            type: Sequelize.DOUBLE
        }
    });
    return Venda;
};