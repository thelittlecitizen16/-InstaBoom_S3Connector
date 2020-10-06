const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const fs = require("fs");
 
// Enter your storage account name and shared key
const account = "instaboomstorage";
const accountKey = "BBPU7VnQG27fAXtL8fHA5Zo1R8ehGvY8gNuMuanz+4zDsw5vd+x32Vi37wFmjh2GVKDVQ/LIs9mgyfuu1JY8OQ==";
 
// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

async function uploadBlob(filename, content)
{
    // Create a blob
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content)).catch(err =>console.log(err));
    console.log(`Upload block blob ${filename} successfully`, uploadBlobResponse.requestId);
}

function readFiles(dirname, onFileContent) {
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        console.log(err);
        return;
      }
      filenames.forEach(function(filename) {
        fs.readFile(dirname + filename, function(err, content) {
          if (err) {
            console.log(err);
            return;
          }
          onFileContent(filename, content).catch(err =>console.log(err));
        });
      });
    });
  }


function saveFile(filename, byteArray)
{
    fs.writeFile("C:\\InstaBoom\\PicsTest\\" + filename, byteArray, (err) =>{
        if (err) return console.log(err);
    } );
}

const containerClient = blobServiceClient.getContainerClient("boomcontainer");

async function downloadFiles(){

    j = 1;
      for await (const blob of containerClient.listBlobsFlat()) {
        const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
        const downloadBlockBlobResponse = await blockBlobClient.downloadToFile("C:\\InstaBoom\\PicsTest\\" + blob.name);
        //const content = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
        //saveFile(blob.name, content);
      }
}

async function downloadFilesTest(){

  j = 1;
    for await (const blob of containerClient.listBlobsFlat()) {
      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      let buffer;
      const downloadBlockBlobResponse = await blockBlobClient.downloadToBuffer();
      console.log(downloadBlockBlobResponse.toString('base64'));
      //const content = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
      //saveFile(blob.name, content);
    }
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

async function deleteFiles()
{
    j = 1;
      for await (const blob of containerClient.listBlobsFlat()) {
        const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
        const downloadBlockBlobResponse = await blockBlobClient.delete();
      }
}

async function listBlobs(){
    j = 1;
    for await (const blob of containerClient.listBlobsFlat()) {
    console.log(blob.name);
    }
}

  //readFiles("C:\\InstaBoom\\InstaboomPics\\", uploadBlob);
  downloadFilesTest().catch(err => console.log(err));
  //deleteFiles();
  //listBlobs();