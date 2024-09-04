//Function for Grabbing Data and Populating Bar Chart

"use client";

import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

//Add color to bars in bar chart
const presetColors = [
  '#FF0000',  '#FFA500',  '#FFFF00', '#008000', '#0000FF', '#800080', '#000000', '#FFFFFF',
];

//get Random color
const getRandomColor = () => {
  return presetColors[Math.floor(Math.random() * presetColors.length)];
};

const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  const [error,setError] = useState('')

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    //Fetch Data from Django
    fetch('http://localhost:8000/api/bar-chart-data/')
        .then(response => response.json())
        .then(data=>{

            if (ctx) {

            //Destroy previous chart
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
            
            //Generate Bar Colors
            const backgroundColors = data.data.map(() => getRandomColor());

            //Create a new chart
                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: data.labels,
                        datasets: [
                            {
                            label: 'My Dataset',
                            data: data.data,
                            backgroundColor: backgroundColors,
                            borderColor: backgroundColors,
                            borderWidth: 0,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
    })

    //Set Error
    .catch(error => {
        setError('Error fetching data: ' + error.message);
      });

    return () => {

      //Cleanup chart
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return(
    <div className='chart-container'>

        {/*Display error if there is an error*/}
        {error?(
        <div >{error}</div>
        ) : (
        <canvas ref={chartRef}></canvas>
        )}
        
    </div>
  ) 
};

export default BarChart;
