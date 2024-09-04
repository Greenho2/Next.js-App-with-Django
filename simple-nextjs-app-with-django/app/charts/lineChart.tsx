//Function to Obtain Data and Populate Line Chart

"use client";

import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


const LineChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  const [error,setError] = useState('')

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    //Fecth Data from Django for the graph
    fetch('http://localhost:8000/api/line-chart-data/')
        .then(response=> response.json())
        .then(data =>{

            if (ctx) {
            //Destroy previous chart if it exists
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

            //Create a new chart
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                    labels: data.labels,
                        datasets: [
                            {
                            label: 'My Data',
                            data: data.data,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        
                        //Used for dynamic resizing when changing window size
                        responsive: true,
                        maintainAspectRatio: true,
                        
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

    //Used for dynamnic resizing
    <div className='chart-container'>
        {/*Display error if there is an error*/}
        {error?(

            <div >{error}</div>
        ) : (
        <canvas ref={chartRef}></canvas>
        )}
        
    </div>
  ); 
};

export default LineChart;
