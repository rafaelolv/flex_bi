module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categoria", {
        nome: {
            type: Sequelize.STRING
        }
    });
    return Categoria;
};