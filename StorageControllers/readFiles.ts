import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import config from '../configuration.json'

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

async function getImageById(id : string) : Promise<string>{

    let downloadBlockBlobResponse = Buffer.alloc(0);
    let blockBlobClient = containerClient.getBlockBlobClient(id);
    try{ 
        downloadBlockBlobResponse = await blockBlobClient.downloadToBuffer();
    }
    catch{ }
    return downloadBlockBlobResponse.toString('base64');
}

function getMultipleImages(imagesIDs:string[]) : Object {
    let base64Files : any = {};
    for (let id of imagesIDs) {
        base64Files[id] = getImageById(id)
    }
    return base64Files;
}

module.exports.getImageById = getImageById;
module.exports.getMultipleImages = getMultipleImages;