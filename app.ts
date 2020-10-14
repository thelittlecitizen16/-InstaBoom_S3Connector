'use strict';
import express = require('express');
import cors = require('cors');
import config from './configuration.json'; 
const app : express.Application = express();

const port = config.server.port;
var coreOptions = {
  origin: config.corsAllowed,
  optionsSuccessStatus: 200
}

app.use(cors(coreOptions));

app.use(express.json());
app.use(express.urlencoded());
app.use(require('./routes/imageRoute.ts'));

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
  