'use strict';

import express = require('express');
import config from './configuration.json'; 
const app : express.Application = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded());
app.use(require('./routes/imageRoute.ts'));

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
  