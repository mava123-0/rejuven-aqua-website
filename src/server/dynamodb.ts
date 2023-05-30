import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service'
// import { env } from '~/env.mjs';

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    sessionToken: process.env.SESSION_TOKEN,
});

let serviceConfigOptions: ServiceConfigurationOptions = {
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT
}

// This instance provides methods to interact with DynamoDB, such as listTables, getItem, putItem
const dynamodb = new AWS.DynamoDB(serviceConfigOptions);
const docClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);

export { dynamodb, docClient };