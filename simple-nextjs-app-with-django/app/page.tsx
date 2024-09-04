'use client';
import LineChart from './charts/lineChart';
import BarChart from './charts/barChart';
import PieChart from './charts/pieChart';
import dynamic from 'next/dynamic';

const CandleStickChart = dynamic(() => import('./charts/candleStickChart'), { ssr: false });


export default function Home() {
  return (
    //Set Background
    <main className="bg-blue-200 text-black p-4 min-h-screen">

      <div className="flex text-3xl p-10">
        Simple Chart Diagram Dashboard
      </div>
      
        {/* Set the graphs into a square for viewing*/}
        
        <div className='grid grid-cols-2 gap-4'>

          <div className="w-full h-full border border-black p-2">
            <CandleStickChart/>
          </div>

          <div className='w-full h-full border border-black p-2'>
            <LineChart/>
          </div>

          <div className='w-full h-full border border-black p-2'>
            <BarChart/>
          </div>

          <div className='w-full h-full border border-black p-2'>
            <PieChart/>
          </div>
        
        </div>
      
      

    </main>
  );
}
