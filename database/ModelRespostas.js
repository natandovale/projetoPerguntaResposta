const Sequelize = require("sequelize");
const connection = require("./databese");

const Resposta = connection.define("resposta",{
    corpo: {
        type: Sequelize.TEXT,
        allwNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});

module.exports= Resposta;