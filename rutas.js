var bodyP = require('body-parser');
var express = require('express');
var app = express();
const controllerTask = require('./controller/controllerTask.js');
app.use(bodyP.urlencoded({ extended: true }));
app.use(bodyP.json());



app.post('/api/tasks', controllerTask.anadir);
app.get('/api/tasks', controllerTask.mostrar);
app.delete('/api/tasks/:id', controllerTask.delete)
app.post('/api/auth/token', controllerTask.obtenerToken )


exports.app = app;