'use strict';

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./ssl/key.pem', 'utf8');
var certificate = fs.readFileSync('./ssl/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

import express = require('express');
import config from './configuration.json'; 
const app : express.Application = express();
const port = config.port;
const httpsPort = config.httpsPort;


app.use(express.json());
app.use(express.urlencoded());
app.use(require('./routes/imageRoute.ts'));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


httpServer.listen(port);
httpsServer.listen(httpsPort);