import { data } from "autoprefixer";
import { docClient } from "./dynamodb";
import { error } from "console";

export const scanTable = async (tableName: String) => {
    console.log("Scanning ", tableName)
    const params = {
        TableName: tableName,
    } as any;

    const scanResults = [] as any[];
    let items;
    do{
        items = await docClient.scan(params).promise();
        items.Items?.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while(typeof items.LastEvaluatedKey !== "undefined");
    
    console.log("Scan Completed: ", tableName)
    return (scanResults);
};

export const latestIdData = async (id : String, tableName : String) => {
    console.log("Fetching Latest Data for ", id, " on table ", tableName)

    const params = {
        TableName: tableName,
        KeyConditionExpression: '#pk = :pk',
        ExpressionAttributeNames: {
          '#pk': 'id',
        },
        ExpressionAttributeValues: {
          ':pk': id,
        },
        ScanIndexForward: false, // Sort in descending order
        Limit: 1, // Retrieve only one item
      } as any

      try {
        const data = await docClient.query(params).promise();
        if (data.Items?.[0]) {
            console.log("Latest Fetched: ", data.Items?.[0])
            return (data.Items?.[0])
        }
    } catch (err) {
        console.error('Error querying table:', err);
        return (err)
      }
}

export const scanIdData = async (id : String, tableName : String) => {
    console.log("Fetching Latest Data for ", id, " on table ", tableName)

    const params = {
        TableName: tableName,
        KeyConditionExpression: '#pk = :pk',
        ExpressionAttributeNames: {
          '#pk': 'id',
        },
        ExpressionAttributeValues: {
          ':pk': id,
        },
        ScanIndexForward: false, // Sort in descending order
      } as any

      try {
        const data = await docClient.query(params).promise();
        if (data.Items) {
            console.log("Latest Fetched: ", data.Items?.[0])
            return (data.Items)
        }
    } catch (err) {
        console.error('Error querying table:', err);
        return (err)
      }
}