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
    let result = blockBlobClient.downloadToBuffer()
    .then((res : Buffer) => {
        return res.toString('base64')
    })
    .catch((err) => {
        return Buffer.alloc(0).toString('base64');
    })
    return result;
}

async function getMultipleImages(imagesIDs:string[]) : Promise<Object> {
    let base64Files : any = {};
    for (let id of imagesIDs) {
        base64Files[id] = (await getImageById(id))
    }
    return base64Files;
}

module.exports.getImageById = getImageById;
module.exports.getMultipleImages = getMultipleImages;