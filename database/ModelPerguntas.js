const Sequelize = require("sequelize");
const connection = require("./databese");

//Criando nossas tabelas     Definindo o nome da tabela
const Pergunta = connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{});

module.exports = Pergunta;