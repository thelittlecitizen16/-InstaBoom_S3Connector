import express = require('express');
var fileReader = require('../StorageControllers/readFiles.ts');
var router = express.Router();

router.post('/getphotos', async (req, res) => {
    let entities = req.body.entities;
    let photos = await fileReader.getMultipleImages(entities);
    res.status(200).send(photos);
})

module.exports = router;