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
//anish
export const fetchMaxMotorStatusOn = async (id: string,date: string, tableName: string) => {
  console.log("Fetching Maximum Motor Status 'on' for each unique id on", date, "from table", tableName);

  const params = {
    TableName: tableName,
    KeyConditionExpression: '#id = :id AND #time > :time',
    FilterExpression: 'motor_status = :status AND #date = :date',
    ExpressionAttributeNames: {
      '#id': 'id',
      '#date': 'date',
      '#time': 'time',
    },
    ExpressionAttributeValues: {
      ':id': id,
      ':date': date,
      ':time': 0,
      ':status': 'On',
    },
    ProjectionExpression: 'id, motor_status',
  };

  try {
    const data = await docClient.query(params).promise();
    const idCounts: { [id: string]: number } = {};

    if (data.Items) {
      data.Items.forEach((item) => {
        const id = item.id;
        if (idCounts[id]) {
          idCounts[id]++;
        } else {
          idCounts[id] = 1;
        }
      });

      const maxCounts: { [count: number]: string[] } = {};
      Object.keys(idCounts).forEach((id) => {
        const count = idCounts[id];
        if (maxCounts[count]) {
          maxCounts[count].push(id);
        } else {
          maxCounts[count] = [id];
        }
      });

      console.log("Maximum Motor Status 'on' for each unique id:", maxCounts);
      return maxCounts;
    }
  } catch (err) {
    console.error('Error querying table:', err);
    return err;
  }
};
export const fetchWaterConsumptionSum = async (id: string, date: string, tableName: string) => {
  console.log("Fetching Water Consumption sum for id:", id, "on date:", date, "from table:", tableName);

  const params = {
    TableName: tableName,
    KeyConditionExpression: '#id = :id AND #time > :time',
    FilterExpression: 'attribute_exists(water_consumption) AND #date = :date',
    ExpressionAttributeNames: {
      '#id': 'id',
      '#date': 'date',
      '#time': 'time',
    },
    ExpressionAttributeValues: {
      ':id': id,
      ':date': date,
      ':time': 0,
    },
    ProjectionExpression: 'water_consumption',
  };

  try {
    const data = await docClient.query(params).promise();

    if (data.Items) {
      let sum = 0;
      data.Items.forEach((item) => {
        const waterConsumption = item.water_consumption;
        if (typeof waterConsumption === 'number') {
          sum += waterConsumption;
        }
      });

      console.log("Water Consumption sum for id:", id, "on date:", date, "is", sum);
      return [sum,id];
    }
  } catch (err) {
    console.error('Error querying table:', err);
    return err;
  }
};
export const fetchWaterConsumptionTillNow = async (id: string, tableName: string) => {
  console.log("Fetching Water Consumption sum for id:", id, "from table:", tableName);

  const params = {
    TableName: tableName,
    KeyConditionExpression: '#id = :id',
    FilterExpression: 'attribute_exists(water_consumption)',
    ExpressionAttributeNames: {
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':id': id,
    },
    ProjectionExpression: 'water_consumption',
  };

  try {
    const data = await docClient.query(params).promise();

    if (data.Items) {
      let sum = 0;
      data.Items.forEach((item) => {
        const waterConsumption = item.water_consumption;
        if (typeof waterConsumption === 'number') {
          sum += waterConsumption;
        }
      });

      console.log("Water Consumption sum for id:", id, "is", sum);
      return [sum,id];
    }
  } catch (err) {
    console.error('Error querying table:', err);
    return err;
  }
};
