const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.AZURE_COSMOS_ENDPOINT;

const key = process.env.AZURE_COSMOS_KEY;

const dbClient = new CosmosClient({ endpoint, key });

const database = dbClient.database("tribal-good-db");

const container = database.container("ScannedForm");
const retailerContainer = database.container("RetailerScanPlan");
const userContainer = database.container("Users");
const feedbackContainer = database.container("Feedback");

module.exports = {
  container,
  retailerContainer,
  userContainer,
  feedbackContainer,
};
