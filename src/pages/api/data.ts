import { get } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
// import { env } from '~/env.mjs';
import { scanTable, latestIdData, scanIdData, fetchMaxMotorStatusOn, fetchWaterConsumptionSum, fetchWaterConsumptionTillNow } from '../../server/db_query'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(!req.body) {
        res.statusCode = 404
        res.end("Error")
        return
    }

    if (req.body.type == "ALL_DATA") {
        console.log("All Data", req.body.tableName)
        const items = await scanTable(req.body.tableName);
        res.status(200).json(items);
    } else if (req.body.type == "LATEST_ID_DATA"){
        console.log("Latest ID Data: ", req.body.id, " from table ", req.body.tableName)
        const items = await latestIdData(req.body.id, req.body.tableName);
        res.status(200).json(items);
    } else if (req.body.type == "SCAN_ID_ALL_DATA"){
        console.log("Scan ID Data: ", req.body.id, " from table ", req.body.tableName)
        const items = await scanIdData(req.body.id, req.body.tableName);
        res.status(200).json(items);
    }
//anish added
    else if (req.body.type=="MAX_MOTOR_ID"){
        console.log("the data from:",req.body.tableName)
        const items=await fetchMaxMotorStatusOn(req.body.id,req.body.date,req.body.tableName);
        res.status(200).json(items);
    }
    else if (req.body.type=="MAX_WATER_CONSUMPTION"){
        console.log("the data from:",req.body.tableName)
        const items=await fetchWaterConsumptionSum(req.body.id,req.body.date,req.body.tableName);
        res.status(200).json(items);

    }
    else if (req.body.type=="WATER_CONSUMPTION_TILL_NOW"){
        console.log("the data from:",req.body.tableName)
        const items=await fetchWaterConsumptionTillNow(req.body.id,req.body.tableName);
        res.status(200).json(items);

    }
}