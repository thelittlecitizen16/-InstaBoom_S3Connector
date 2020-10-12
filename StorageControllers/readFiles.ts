import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { result } from "lodash";
import config from '../configuration.json'

//sharp image sizer
const sharp = require("sharp");

// Azure storage credentials
const account = config.azureCredentials.account;
const accountKey = config.azureCredentials.accountkey;

// Azure blob service connection
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerClient = blobServiceClient.getContainerClient(config.imagesContainerName);

async function getImageById(id : string) : Promise<any>{

    let blockBlobClient = containerClient.getBlockBlobClient(id);
    let result = blockBlobClient.downloadToBuffer()
    .then((res : Buffer) => {
       var data : Promise<string> = sharp(res)
        .resize(420,300)
        .toBuffer()
        return data;
    })
    .catch((err) => {
        return Buffer.alloc(0).toString('base64');
    })
    return result
    
}

async function getMultipleImages(imagesIDs:string[]) : Promise<Object> {
    let base64Files : any = {};
    for (let id of imagesIDs) {
        let data = await getImageById(id)
        base64Files[id] = data.toString('base64')
    }
    return base64Files;
}

module.exports.getImageById = getImageById;
module.exports.getMultipleImages = getMultipleImages;