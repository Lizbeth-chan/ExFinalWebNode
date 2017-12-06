var bodyP = require('body-parser');
var modelos = require ('../model/modelos').modelos;
var express = require('express');
var app = express();
const jsrsasign = require('jsrsasign');
app.use(bodyP.urlencoded({ extended: true }));
 

app.use(bodyP.json());

exports.anadir = function(req, res){  //Crea el modelo

  res.setHeader('Content-Type', 'application/json');
  console.log(req.body.text);
  if (req.body.text && req.body.done && req.body.date) {
    if(modelos.length>0){
      var numero = (modelos[modelos.length-1].id);
    }
    else{
      numero = 0;
    }
    req.body.id = numero+1;
    req.body.createdAt = new Date();
    req.body.updatedAt = new Date();
    modelos.push(req.body);
    res.send('{"identificador:":'+req.body.id+'}');  
  }else{
    res.status(400);
    res.send("error HTTP 404");
  }
  
};

exports.mostrar = function(req,res){ //Regresa los datos
    res.setHeader('Content-Type', 'application/json');
    res.send(modelos);
};

exports.delete = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    for (var i = 0; i < modelos.length; i++){
      if (modelos[i].id == req.params.id){
        modelos.splice(i,1);
        res.send("Elemento Eliminado");
      }
    }
      res.send("error http 404");
};

exports.obtenerToken = function(req,res){
  
  res.setHeader('Content-Type', 'application/json');

  var usernameEx = req.body.username;
  var passwordEx = req.body.password;

  let header = {
    alg: "HS256",
    typ: "JWT"
  };

  let payload = {};

  payload.iat = jsrsasign.jws.IntDate.get('now'); // cuando se genero

  payload.user = usernameEx;
  payload.pass = passwordEx;

  payload.secretCode = 'secret-code';
  payload.currentState = 'state_current';


  let fraseSecreta = passwordEx;
  let jwt = jsrsasign.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), fraseSecreta);

  jwtGenerado = {"token": jwt}

  res.send(jwtGenerado);
};