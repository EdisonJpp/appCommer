const express = require('express');
const routes = require('./routes');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express(); 

app.use(cors());
app.use(express.json({limit : '50mb'}));
app.use(bodyparser.urlencoded({ extended: true,  limit : '50mb'}));
app.use(express.static("public"));
app.use('/', routes());
app.listen( process.env.PORT || 5000 , ()=> console.log('servidon on'));
