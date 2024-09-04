//Function for Grabbing Data and Populating Pie Chart

"use client";

import { useEffect, useRef, useState } from 'react';
import { Chart, Chart as ChartJS, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

//Define Interface
interface PieChartData {
  labels: string[];
  data: number[];
}

const PieChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<ChartJS<'pie', number[], string> | null>(null);

    const [error,setError] = useState('')

    //Color mapping for most common colors so the color on graph will match the label
    const colorMapping: { [key: string]: string } = {
        'Red': '#FF0000', 
        'Orange': '#FFA500', 
        'Yellow': '#FFFF00', 
        'Green': '#008000',
        'Blue': '#0000FF',
        'Purple': '#800080',
        'Black': '#000000',
        'White': '#FFFFFF',
    };

  

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    
    //Grab data from Django
    fetch('http://localhost:8000/api/pie-chart-data/')
        .then(response => response.json())
        .then((data: PieChartData)=>{
            const backgroundColors = data.labels.map((label: string) => colorMapping[label] || '#CCCCCC');
        
            if (ctx) {
            //Destroy previous chart
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                //Create a new chart
                chartInstance.current = new Chart<'pie', number[], string>(ctx, {
                    type: 'pie',
                    data: {
                        labels: data.labels,
                        datasets: [
                            {
                            label: 'My Dataset',
                            data: data.data,
                            backgroundColor: backgroundColors,
                            borderColor: 'rgba(0,0,0)',
                            borderWidth: 0,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,

                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    } as ChartOptions<'pie'>,
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
        {/*Display error if there is one*/}
        {error?(
        <div >{error}</div>
        ) : (
        <canvas ref={chartRef}></canvas>
        )}
        
    </div>
  ) 
};

export default PieChart;
