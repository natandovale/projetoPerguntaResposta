const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/databese");
const perguntaModel = require("./database/ModelPerguntas");
const respostaModel = require("./database/ModelRespostas");
const app = express();

//Database
connection.authenticate().then(()=>{
    console.log("Conexão feito com o banco de dados");
}).catch((msgerr)=>{
    console.log(msgerr);
})

//EJS
//Mandando o Express usar o EJS como Viwe engine
app.set("view engine", "ejs");
//EJS

//Usanso o body-parser no node para pegar os dados do usuario no formulario
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Arquivos estaticos
app.use(express.static('public'));

//ROTAS
app.get("/", (req,res) => {
    perguntaModel.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
    
});

app.get("/pergunta/:id", (req,res)=>{
    var id = req.params.id;
    perguntaModel.findOne({
        where: {id: id}
    }).then(pergunta => {
       if(pergunta != undefined){
        respostaModel.findAll({
            where: {pergundaId: pergunta.id}
        }).then(respostas => {
            res.render("pergunta",{
                pergunta: pergunta,
                respostas: respostas
            });
        });
       }else{
           res.redirect("/");
       }
    });
  
})

app.get("/perguntar", (req,res)=>{
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});

app.post("/responder", (req,res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    respostaModel.create({
       corpo: corpo,
       perguntaId: perguntaId 
    }).then(()=>{
        res.redirect("pergunta/"+perguntaId);
    });

});


//Servidor
app.listen(8080, () => {
    console.log("App rodando");
});