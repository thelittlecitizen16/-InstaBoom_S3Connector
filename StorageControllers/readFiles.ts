import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import fs from "fs";
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

    let j = 1;
    var blockBlobClient = containerClient.getBlockBlobClient(id);
    var downloadBlockBlobResponse = await blockBlobClient.downloadToBuffer();
    return downloadBlockBlobResponse.toString('base64');
}

async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
  }