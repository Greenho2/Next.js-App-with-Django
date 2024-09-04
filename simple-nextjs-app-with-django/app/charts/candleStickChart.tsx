//Function to grab and populate candlestick chart

"use client";

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

//Define the chart options
const options: ApexOptions={
  chart: {
    type: 'candlestick',
    height: 350,
  },
  title: {
    text: 'Candlestick Chart',
    align: 'left',
  },
  xaxis: {
    type: 'datetime',
    labels: {
      format: 'MMM dd'
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
};

const CandleStickChart: React.FC = () => {

    //State to hold chart data
    const [series, setSeries] = useState<any[]>([]);

    const [error,setError] = useState('')

    useEffect(() => {

      //Fetch candlestick data from the Django API
      fetch('http://localhost:8000/api/candlestick-data/')
        .then(response => response.json())
        .then(data => {

          //Format the data as needed
          const formattedData = data.data.map((item: any) => ({
            x: new Date(item.x).getTime(),
            y: [item.open, item.high, item.low, item.close],
          }));
          setSeries([{ name: 'Candlestick Data', data: formattedData }]);
        })
        .catch(error => {
          setError('Error fetching data: ' + error.message);
        });

    }, []);
  
  return (
    <div className="chart-container">
      
      {/*Display Error if there is one*/}
      {error?(
        <div >{error}</div>
        ) : (
        <Chart
          options= {options}
          series={series}
          type="candlestick"
          height={350}
        />
        )}
    </div>
  );
};

export default CandleStickChart;
