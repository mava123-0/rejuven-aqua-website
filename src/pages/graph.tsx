import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
import { int } from 'aws-sdk/clients/datapipeline';
import { Typography } from '@mui/material';

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

const getGraph = (x_data: Array<string>, y_data: Array<int>) => {
  let x_index = []
  for (var i = 0; i < x_data.length; i++) {
    x_index.push(i);
  }
  
  const data = {               
    labels: x_data, 
    datasets:[
      {
        label:"Water Consumption",
        data: y_data,
        backgroundColor:'deepskyblue',
        borderColor:'deepskyblue',
        tension:0.4,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
      }
    ]
  }
  console.log("x_data", x_data)
  console.log("y_data", y_data)
  return (
    <div className="App" style={{width:'800px', height:'800px'}}>
      <Typography>Water Consumption</Typography>
      <Line data={data}
      >
          Hello
      </Line>
    </div>
  );
}

export default getGraph;