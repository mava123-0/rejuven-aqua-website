import { apiReq } from "@/server/utils";
import { useState, useEffect } from "react";
import Select from '@mui/material/Select';
import { Box, MenuItem, ModalRoot, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl } from "@mui/material";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import getGraph from "./graph";
import { int } from "aws-sdk/clients/datapipeline";

const displayData = () => {
    const [ohtDateList, setOhtDateList] = useState<Array<string>>([])
    const [ohtWaterConsumedList, setOhtWaterConsumedList] = useState<Array<int>>([])
    const [ugsDateList, setUgsDateList] = useState<Array<string>>([])
    const [ugsWaterConsumedList, setUgsWaterConsumedList] = useState<Array<int>>([])

    const [nodeValue, setNodeValue] = useState<String | null>(null)
    const [ohtId, setOhtId] = useState<String>("")
    const [ugsId, setUgsId] = useState<String | null>(null)
    const [motorId, setMotorId] = useState<String>("")

    const [motorStatus, setMotorStatus] = useState<any>(null)
    const [ugsWaterLevel, setUgsWaterLevel] = useState<any>(null)
    const [ohtWaterLevel, setOhtWaterLevel] = useState<any>(null) 
    const [ugsWaterConsumption, setUgsWaterConsumption] = useState<any>(null)
    const [ohtWaterConsumption, setOhtWaterConsumption] = useState<any>(null)

    const scanTable = async (tableName : String) => {
        const items = await apiReq("data", {
            type: 'ALL_DATA',
            tableName : tableName
        }) as any[];

        console.log("Scan All Items ", items)
        return items
    }

    const scanIdData = async (id : String, tableName : String) => {
        const items = await apiReq("data", {
            type: 'SCAN_ID_ALL_DATA',
            tableName : tableName,
            id : id
        }) as any[];

        console.log("Scan All Items ", items)
        return items
    }

    const latestIdData = async (id : String, tableName : String) => {
        const data = await apiReq ("data", {
            type : 'LATEST_ID_DATA',
            tableName : tableName,
            id : id  
        }) as any [];

        console.log("Latest Data ", data)
        return data
    }


    const handleNodeChange = (e : any) => {
        e.preventDefault();
        setNodeValue(e.target.value)
        setMotorId(e.target.value + '_' + e.target.value)
        setOhtId(e.target.value + '_oht')
        setUgsId(e.target.value + '_ugs')
    }

    const getOhtGraphValues = () => {
        {scanIdData(ohtId as string, "swm_water_consumption")
            .then((result) => {
                console.log("length", result.length)
                var dateList: Array<string> = [];
                var consumptionList : Array<int> = []

                for (var i = 0; i < result.length; i++) {
                    dateList.push(result[i]['date']);
                    consumptionList.push(result[i]['water_consumption']);
                }
                setOhtDateList(dateList)
                setOhtWaterConsumedList(consumptionList)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
        })}
        return null
    }
    const getUgsGraphValues = () => {
        {scanIdData(ugsId as string, "swm_water_consumption")
            .then((result) => {
                console.log("length", result.length)
                var dateList: Array<string> = [];
                var consumptionList : Array<int> = []

                for (var i = 0; i < result.length; i++) {
                    dateList.push(result[i]['date']);
                    consumptionList.push(result[i]['water_consumption']);
                }
                setUgsDateList(dateList)
                setUgsWaterConsumedList(consumptionList)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
        })}
        return null
    }

    useEffect (() => {
        {motorId?
                latestIdData(motorId as string, "swm_motor_state")
                    .then((result) => {
                        setMotorStatus(result);
                        console.log("Motor Status: ", result)
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                })
                :
                null
        }

        {ugsId ?
                <>
                {latestIdData(ugsId as string, "swm_water_levels")
                    .then((result) => {
                        setUgsWaterLevel(result);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                })}
                {latestIdData(ugsId as string, "swm_water_consumption")
                    .then((result) => {
                        setUgsWaterConsumption(result);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                })}
                </>
                :
                null
        }

        {ohtId ?
                <>
                {latestIdData(ohtId as string, "swm_water_levels")
                    .then((result) => {
                        setOhtWaterLevel(result);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                })}
                {latestIdData(ohtId as string, "swm_water_consumption")
                    .then((result) => {
                        setOhtWaterConsumption(result);
                        console.log("oht water", result)
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                })}
                </>
                :
                null
        }
        
    }, [nodeValue]);

    return (
        <Box>
            <Typography variant='h4' align="center" sx={{ fontWeight: 'bold' }}>REJUVEN AQUA</Typography>
        <Paper elevation={10} sx={{ml:5, mr:5}}>
        <Box sx={{m:5, p:3}}>
            <Box sx={{ml:25}}>
                <FormControl>
                    <Select 
                    style={{ width: '820px' }}
                    onChange={(event) => handleNodeChange(event)}
                    required>
                        <MenuItem value="1">Node 1</MenuItem>
                        <MenuItem value="2">Node 2</MenuItem>
                        <MenuItem value="3">Node 3</MenuItem>
                        <MenuItem value="4">Node 4</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{mt:2, ml:25}}>
                {motorStatus?
                    <Typography>Motor Status: 
                    <Typography display={"flex"}>
                        <Typography sx={{ fontWeight: 'bold' }}>
                            Motor Status: 
                        </Typography>
                        <span style={{ color: motorStatus["motor_status"]=="on" ? 'green' : 'red' }}>
                            {motorStatus["motor_status"]}
                            <br />
                        </span>
                    </Typography>
                    :
                    <Typography sx={{ fontWeight: 'bold' }}>Select Node</Typography>
                }
                {ugsWaterLevel ?
                        <Typography display={"flex"}>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Sump Water Level: 
                            </Typography>
                            <span style={{ color: ugsWaterLevel['water_level']==0 ? 'red' : 'black' }}>
                                {ugsWaterLevel['water_level']==2?" Half" : (ugsWaterLevel['water_level']==0?" Empty" : " Full")}
                            </span>
                        </Typography>
                        :
                        null
                }
                {ohtWaterLevel ?
                        <Typography display={"flex"}>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Overhead Tank Level: 
                            </Typography>
                            {ohtWaterLevel['water_level']==2?" Half" : (ohtWaterLevel['water_level']==0?" Empty" : " Full")}
                        </Typography>
                        :
                        null
                }
                {ugsWaterConsumption ?
                        <Typography display={"flex"}>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Sump Consumption on {ugsWaterConsumption['date']}: {} 
                            </Typography>
                            {ugsWaterConsumption['water_consumption']}
                        </Typography>
                        :
                        null
                }
                {ohtWaterConsumption ?
                        <Typography display={"flex"}>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Overhead Tank Consumption on {ohtWaterConsumption['date']}: {} 
                            </Typography>
                            {ohtWaterConsumption['water_consumption']} 
                        </Typography>
                        :
                        null
                }
            </Box>

            <Box sx={{mt:2}} 
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                {getOhtGraphValues()}
                {getGraph(ohtDateList, ohtWaterConsumedList)}
            </Box>

            <Box sx={{mt:2}} 
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                {/* TODO: SHOW UGS WATER CONSUMPTION */}
                {/* <Typography>Underground Sump Water Consumption</Typography>
                {getUgsGraphValues()}
                {getGraph(ugsDateList, ugsWaterConsumedList)} */}
            </Box>
            <button className=""></button>
        </Box>
        </Paper>
        </Box>
    );
}

export default displayData;