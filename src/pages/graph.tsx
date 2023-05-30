import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
import { int } from 'aws-sdk/clients/datapipeline';

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

const getGraph = (x_data: Array<string>, y_data: Array<int>) => {
  let x_copy = [1,2,3,4,5,6,7,8,9,10]
  
  const data = {                   //[data, setData]= useState({
    labels: x_copy, //x_data
    datasets:[
      {
        label:"First Dataset",
        data: y_data,
        backgroundColor:'yellow',
        borderColor:'green',
        tension:0.4,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
      }
    ]
  } //)
  console.log("x_data", x_data)
  console.log("y_data", y_data)
  return (
    <div className="App" style={{width:'800px', height:'800px'}}>
      <Line data={data}>Hello</Line>
    </div>
  );
}

export default getGraph;




// import { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

// ChartJS.register(
//   Title, Tooltip, LineElement, Legend,
//   CategoryScale, LinearScale, PointElement, Filler
// );

// const getGraphData = (x_data: Array<string>, y_data: Array<number>) => {
//   return {
//     labels: x_data,
//     datasets: [
//       {
//         label: "First Dataset",
//         data: y_data,
//         backgroundColor: 'yellow',
//         borderColor: 'green',
//         tension: 0.4,
//         fill: true,
//         pointStyle: 'rect',
//         pointBorderColor: 'blue',
//         pointBackgroundColor: '#fff',
//         showLine: true
//       }
//     ]
//   };
// };

// const Graph = ({ x_data, y_data }) => {
//   const [data, setData] = useState(getGraphData(x_data, y_data));

//   return (
//     <div className="App" style={{ width: '800px', height: '800px' }}>
//       <Line data={data}>Hello</Line>
//     </div>
//   );
// };

// export default Graph;





// import { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

// ChartJS.register(
//   Title, Tooltip, LineElement, Legend,
//   CategoryScale, LinearScale, PointElement, Filler
// );

// const getGraphData = (x_data: Array<string>, y_data: Array<number>) => {
//   return {
//     labels: x_data,
//     datasets: [
//       {
//         label: "First Dataset",
//         data: y_data,
//         backgroundColor: 'yellow',
//         borderColor: 'green',
//         tension: 0.4,
//         fill: true,
//         pointStyle: 'rect',
//         pointBorderColor: 'blue',
//         pointBackgroundColor: '#fff',
//         showLine: true
//       }
//     ]
//   };
// };

// const Graph = ({ x_data, y_data }) => {
//   const [data, setData] = useState(getGraphData(x_data, y_data));

//   return (
//     <div className="App" style={{ width: '800px', height: '800px' }}>
//       <Line data={data}>Hello</Line>
//     </div>
//   );
// };

// export default Graph;
