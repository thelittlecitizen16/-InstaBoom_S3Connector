import express = require('express');
import {schemasMiddleware} from '../validators/imageRouteValidator'
  
var fileReader = require('../StorageControllers/readFiles.ts');
var router = express.Router();

router.post('/getphotos', schemasMiddleware(), async (req, res) => {
    let entities = req.body.entities;
    let photos = await fileReader.getMultipleImages(entities);
    res.status(200).send(photos);
})

module.exports = router;