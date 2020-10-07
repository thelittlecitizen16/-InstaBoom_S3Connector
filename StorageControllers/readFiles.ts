import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import config from '../configuration.json'

interface FilesAsBase64{
    
}

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

    let blockBlobClient = containerClient.getBlockBlobClient(id);
    let downloadBlockBlobResponse = await blockBlobClient.downloadToBuffer();
    return downloadBlockBlobResponse.toString('base64');
}

async function getMultipleImages(imagesIDs:string[]) : Promise<string[]> {
    let base64Files : any = {};
    for (let id of imagesIDs) {
        let base64string = await getImageById(id);
        base64Files[id] = base64string;
    }
    return base64Files;
}

module.exports.getImageById = getImageById;
module.exports.getMultipleImages = getMultipleImages;