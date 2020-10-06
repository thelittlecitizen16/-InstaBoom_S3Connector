import express = require('express');
var fileReader = require('../StorageControllers/readFiles.ts');
var router = express.Router();

router.post('/getphotos', async (req, res) => {
    let entities = req.body.entities;
    //console.log(entities);
    let photos = await fileReader.getMultipleImages(entities);
    //console.log(photos);
    
    //let photosJSON = JSON.parse(photos);
    res.status(200).send(photos);
})

module.exports = router;