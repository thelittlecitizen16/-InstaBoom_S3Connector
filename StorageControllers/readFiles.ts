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