const Sequelize = require("sequelize");
                                 //nome do banco de dados/nome do usuario/ senha do usuario
const connection = new Sequelize('guia_perguntas', 'root', 'senha',{
    host: 'localhost',//endereco do servidor
    dialect: 'mysql'//linguagem utilizada do banco de dados
});

module.exports = connection;
