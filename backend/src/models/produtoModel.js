module.exports = (sequelize, Sequelize) => {
    const Produto = sequelize.define("produto", {
        nome: {
            type: Sequelize.STRING
        },
        valorVenda: {
            type: Sequelize.DOUBLE
        },
        valorCompra: {
            type: Sequelize.DOUBLE
        }
    });
    return Produto;
};