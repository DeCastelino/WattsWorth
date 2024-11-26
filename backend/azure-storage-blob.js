// Azure Storage dependency
const {
    StorageSharedKeyCredential,
    BlobServiceClient,
} = require("@azure/storage-blob");
const path = require("path");

// Azure Storage resource name
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
if (!accountName) throw Error("Azure Storage accountName not found");

// Azure Storage resource key
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
if (!accountKey) throw Error("Azure Storage accountKey not found");

// Create credential
const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
);

const baseUrl = `https://${accountName}.blob.core.windows.net`;

// container name should be supplied
const containerName = `tribal-good-storage-blob`;

const blobServiceClient = new BlobServiceClient(baseUrl, sharedKeyCredential);

//uploading file to Azure Storage (supply blob name)
async function uploadFile(blobName) {
    try {
        const containerClient = await blobServiceClient.getContainerClient(
            containerName
        );
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const localFileWithPath = path.join(
            __dirname + `/public/uploads/` + blobName
        );
        await blockBlobClient.uploadFile(localFileWithPath);
        return blockBlobClient.url;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = { uploadFile, blobServiceClient };
