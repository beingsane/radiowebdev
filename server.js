var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = 8080;

var FRONTEND_PATH = __dirname+'/www';
app.use(express.static(FRONTEND_PATH));

//Fake database
var users = [
  {id:1, nome: "Fábio Rogério", email:"fabio.rogerio.sj@gmail.com", senha:'123'},
  {id:2, nome: "João da Silva", email:"joao@joao.com", senha:'123'},
  {id:3, nome: "Maria Antonieta", email:"maria@maria.com", senha:'123'}
];
var musics = [
  {id:1, nome:"Tiësto - Red Lights", id_youtube:"CFF0mV24WCY", time:"3:32"},
  {id:2, nome:"Calvin Harris - Summer", id_youtube:"ebXbLfLACGM", time:"3:53"},
  {id:3, nome:"David Guetta & Showtek - Bad ft. Vassy (Lyrics Video)", id_youtube:"oC-GflRB0y4"}
];

app.get('/', function(req, res) {
	res.sendfile(FRONTEND_PATH+'/index.html');
});

app.post('/login', function(req, res){
  if(!req.body.email || !req.body.senha){
    res.jsonp({isValid:false, msg: "Parametros não informados!"});
  } else {
    var user = null;
    for(i in users){
      if(req.body.email == users[i].email && req.body.senha == users[i].senha){
        user = users[i];
      }
    }
    if(user){
      res.jsonp({isValid:true, data: users[i]});
    } else {
      res.jsonp({isValid:false, msg: "Usuário não cadastrado"});
    }
  }
});
app.post('/user/cadaster', function(req, res){
  if(!req.body.nome || !req.body.email || !req.body.senha){
    res.jsonp({isValid:false, msg: "Parametros não informados!"});
  } else {
    req.body.id = users[users.length-1].id + 1;
    users.push(req.body);
    res.jsonp({isValid:true, data: req.body});
    
  }
});
app.get('/music/list', function(req, res){
  res.jsonp({isValid:true, data: musics});
});
app.post('/music/cadaster', function(req, res){
  console.log(req.body);
  if(!req.body.nome || !req.body.id_youtube || !req.body.time){
    res.jsonp({isValid:false, msg: "Parametros não informados!"});
  } else {
    req.body.id = musics[musics.length-1].id + 1;
    musics.push(req.body);
    res.jsonp({isValid:true, data: req.body});
  }
});
app.post('/music/delete', function(req, res){
  console.log(req.body);
  if(!req.body.id){
    res.jsonp({isValid:false, msg: "Parametros não informados!"});
  } else {
    for(i in musics){
      if(musics[i].id == req.body.id){
        musics.splice(i, 1);
      }
    }
    res.jsonp({isValid:true});
  }
});


server.listen(port);
console.log('\n\nServer - RadioWEBDEV rodando na porta: ' + port);














Rotas para prática:

"/login" (POST)
Rota para logar no sistema
Paramestros:
{
  email: "email do usuário",
  senha: "senha do usuário"
}
Retorno:
{
  isValid: "valor lógico",
  msg: "Caso valor lógico for falso é exibido a mensagem de erro",
  data: "objeto do retorno"
}

"/user/cadaster" (POST)
Rota para cadastrar novo usuário
Paramestros:
{
  nome: "nome do usuário",
  email: "email do usuário",
  senha: "senha do usuário"
}
Retorno:
{
  isValid: "valor lógico",
  msg: "Caso valor lógico for falso é exibido a mensagem de erro",
  data: "objeto do retorno"
}

"/music/list" (GET)
Rota para listar músicas cadastradas
Paramestros:
{}
Retorno:
{
  isValid: "valor lógico",
  msg: "Caso valor lógico for falso é exibido a mensagem de erro",
  data: "lista das músicas"
}

"/music/cadaster" (POST)
Rota para cadastrar nova música
Paramestros:
{
  nome: "nome da música",
  id_youtube: "id do youtube",
  time: "tempo da música"
}
Retorno:
{
  isValid: "valor lógico",
  msg: "Caso valor lógico for falso é exibido a mensagem de erro",
  data: "objeto do retorno"
}

"/music/delete" (POST)
Rota para deletar uma determinada música
Paramestros:
{
  id: "id da música"
}
Retorno:
{
  isValid: "valor lógico",
  msg: "Caso valor lógico for falso é exibido a mensagem de erro",
  data: "objeto do retorno"
}    



server.listen(port);
console.log('\n\nServer - RadioWEBDEV rodando na porta: ' + port);

