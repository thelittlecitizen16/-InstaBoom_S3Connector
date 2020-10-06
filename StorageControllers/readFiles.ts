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

    let blockBlobClient = containerClient.getBlockBlobClient(id);
    let downloadBlockBlobResponse = await blockBlobClient.downloadToBuffer();
    return downloadBlockBlobResponse.toString('base64');
}

async function getMultipleImages(imagesIDs:string[]) : Promise<string[]> {
    let base64Files = [];
    for (let id of imagesIDs) {
        let base64file = await getImageById(id);
        base64Files.push(base64Files);
    }
    return base64Files;
}

module.exports.getImageById = getImageById;
module.exports.getMultipleImages = getMultipleImages;