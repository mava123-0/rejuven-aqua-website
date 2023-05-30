import { NextPage } from 'next';
import { apiReq } from "@/server/utils";
import { useState, useEffect } from "react";
import Select from '@mui/material/Select';
import { Box, Card, Divider, MenuItem, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl } from "@mui/material";
import { Typography } from "@mui/material";
import CardOverflow from '@mui/joy/CardOverflow';
import { AspectRatio } from '@mui/joy';

const displayStuff = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [inputter, selectInputter] = useState<any>("");
  const [maxwater, setMaxWater] = useState<any>("");
  const [maxmotor, setMaxMotor] = useState<any>("");
  const [maxmotortimes, setMaxMotorTimes] = useState<any>("");
  const [nodeOne, setNodeOne] = useState<any>("");
  const [nodeTwo, setNodeTwo] = useState<any>("");
  const [nodeThree, setNodeThree] = useState<any>("");
  const [nodeFour, setNodeFour] = useState<any>("");
  const [nodeOneval, setNodeOneVal] = useState<any>("");
  const [nodeTwoval, setNodeTwoVal] = useState<any>("");
  const [nodeThreeval, setNodeThreeVal] = useState<any>("");
  const [nodeFourval, setNodeFourVal] = useState<any>("");

  const maxmotorstate = async (id: String, date: String, tableName: String) => {
    const data = await apiReq("data", {
      type: 'MAX_MOTOR_ID',
      tableName: tableName,
      date: date,
      id: id
    }) as any[];
    console.log("Latest Data ", data);
    return data;
  };

  const maxwaterconsumption = async (id: String, date: String, tableName: String) => {
    const data = await apiReq("data", {
      type: 'MAX_WATER_CONSUMPTION',
      tableName: tableName,
      date: date,
      id: id
    }) as any[];
    console.log("Latest Data ", data);
    return data;
  };

  const waterconsumptiontillnow = async (id: String, tableName: String) => {
    const data = await apiReq("data", {
      type: 'WATER_CONSUMPTION_TILL_NOW',
      tableName: tableName,
      id: id
    }) as any[];
    console.log("Latest Data ", data);
    return data;
  };

  return (
    <Box>
      <Divider orientation="vertical" sx={{ fontSize: "48px" }}>Analytics page</Divider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginTop: 20,
        }}
      >

        <Card variant="outlined" sx={{ width: 350 }}>
          <CardOverflow>
            <Divider orientation="vertical" sx={{ fontSize: "25px" }}>Motor State</Divider>
            <AspectRatio ratio="2">
              <FormControl>
                <TextField
                  id="outlined-basic"
                  label="Enter the date"
                  variant="outlined"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </FormControl>
            </AspectRatio>
          </CardOverflow>
          <Button
            sx={{ width: 350 }}
            variant="contained"
            onClick={() => {
              if (selectedDate) {
                const promises = [
                  maxmotorstate("1_1", selectedDate, "swm_motor_state"),
                  maxmotorstate("2_2", selectedDate, "swm_motor_state"),
                  maxmotorstate("3_3", selectedDate, "swm_motor_state"),
                  maxmotorstate("4_4", selectedDate, "swm_motor_state")
                ];

                Promise.all(promises)
                  .then((results) => {
                    console.log(results)
                    const maxValues = results.map(node => parseInt(Object.keys(node)[0]));
                    const maxMotorState = Math.max(...maxValues); // Find the maximum value
                    console.log("Max Motor State:", maxMotorState);
                    setMaxMotorTimes(maxMotorState)
                    results.forEach(result => {
                      if (parseInt(Object.keys(result)[0]) === maxMotorState) {
                        setMaxMotor(result[maxMotorState][0])
                      }
                    });
                    // Do something with the maximum value
                  })
                  .catch((error) => {
                    console.error("Error fetching data:", error);
                  });
              }
            }}
          >
            Get Max Motor State
          </Button>
          <CardOverflow
            variant="soft"
            sx={{
              display: 'flex',
              gap: 1.5,
              py: 1.5,
              px: 'var(--Card-padding)',
              bgcolor: 'background.level1',
            }}
          >
            <Box sx={{ display: 'block' }}>The motor with the highest usage is: {maxmotor}</Box>
            <Box>The number of times this motor was turned on was: {maxmotortimes}</Box>
            <Divider orientation="vertical" />
          </CardOverflow>
        </Card>

        <Card variant="outlined" sx={{ width: 350 }}>
          <CardOverflow>
            <Divider orientation="vertical" sx={{ fontSize: "25px" }}>Water Consumption</Divider>
            <AspectRatio ratio="2">
              <FormControl>
                <TextField
                  id="outlined-basic"
                  label="Enter the date"
                  variant="outlined"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </FormControl>
            </AspectRatio>
          </CardOverflow>
          <Button
            sx={{ width: 350 }}
            variant="contained"
            onClick={() => {
              if (selectedDate) {
                const promises = [
                  maxwaterconsumption("1_oht", selectedDate, "swm_water_consumption"),
                  maxwaterconsumption("2_oht", selectedDate, "swm_water_consumption"),
                  maxwaterconsumption("3_oht", selectedDate, "swm_water_consumption"),
                  maxwaterconsumption("4_oht", selectedDate, "swm_water_consumption")
                ];

                Promise.all(promises)
                  .then((results) => {
                    console.log(results);
                    if (results.length > 0) {
                      const maxWaterConsumption = Math.max(...results.map(result => result[0]));
                      console.log("Max Water consumed:", maxWaterConsumption);
                      setMaxWater(maxWaterConsumption)
                      // Print the second value where the first value is the maximum
                      results.forEach(result => {
                        if (result[0] === maxWaterConsumption) {
                          selectInputter(result[1])
                        }
                      });
                    } else {
                      console.log("No results found");
                    }
                  })
                  .catch((error) => {
                    console.error("Error fetching data:", error);
                  });
              }
            }}
          >
            Get Max Water consumed
          </Button>
          <CardOverflow
            variant="soft"
            sx={{
              display: 'flex',
              gap: 1.5,
              py: 1.5,
              px: 'var(--Card-padding)',
              bgcolor: 'background.level1',
            }}
          >
            <Box sx={{ display: 'block' }}>The tank with the highest usage is: {inputter}</Box>
            <Box>The usage of the tank is: {maxwater}</Box>
            <Divider orientation="vertical" />
          </CardOverflow>
        </Card>

        <Card variant="outlined" sx={{ width: 350 }}>
          <CardOverflow>
            <Divider orientation="vertical" sx={{ fontSize: "25px" }}>Water Consumption for all nodes</Divider>
            <Box sx={{ bgcolor: '#fff' }}>
              <Box sx={{ display: 'block', py: 1 }}>The tank {nodeOne} has consumed {nodeOneval} till now</Box>
              <Box sx={{ display: 'block', py: 1 }}>The tank {nodeTwo} has consumed {nodeTwoval} till now</Box>
              <Box sx={{ display: 'block', py: 1 }}>The tank {nodeThree} has consumed {nodeThreeval} till now</Box>
              <Box sx={{ display: 'block', py: 1 }}>The tank {nodeFour} has consumed {nodeFourval} till now</Box>
            </Box>
          </CardOverflow>
          <Button
            sx={{ width: 350, position: 'relative', top: 97 }}
            variant="contained"
            onClick={() => {
              const promises = [
                waterconsumptiontillnow("1_oht", "swm_water_consumption"),
                waterconsumptiontillnow("2_oht", "swm_water_consumption"),
                waterconsumptiontillnow("3_oht", "swm_water_consumption"),
                waterconsumptiontillnow("4_oht", "swm_water_consumption")
              ];
              Promise.all(promises)
                .then((results) => {
                  console.log(results)
                  setNodeOne(results[0][1])
                  setNodeOneVal(results[0][0])
                  setNodeTwo(results[1][1])
                  setNodeTwoVal(results[1][0])
                  setNodeThree(results[2][1])
                  setNodeThreeVal(results[2][0])
                  setNodeFour(results[3][1])
                  setNodeFourVal(results[3][0])
                  // Do something with the maximum value
                })
                .catch((error) => {
                  console.error("Error fetching data:", error);
                });
            }}
          >
            Get Water consumed till now
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export default displayStuff;
