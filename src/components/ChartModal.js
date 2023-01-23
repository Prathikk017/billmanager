import React, { useRef } from 'react';
import styles from '../styles/modules/modal.module.scss';
import {MdOutlineClose} from 'react-icons/md';
import {
    Chart as ChartJS,
    TimeScale, // x axis
    LinearScale,// y axis
    LineElement,
    PointElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import 'chartjs-adapter-date-fns';
  import {getElementAtEvent, Line} from "react-chartjs-2";



  ChartJS.register(
    TimeScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
  );

function ChartModal({modalsOpen,setModalsOpen}) {
  const billLists = window.localStorage.getItem('billList');
  const billListArr= JSON.parse(billLists);
  

 
    const data ={
        labels: billListArr.map((bill) => bill.date),
        datasets: [
          {
            label: 'bills',
            data: billListArr.map((bill) => bill.amount),
            backgroundColor: 'aqua',
            borderColor: 'black',
            tension: 0.4
          }
        ]
      };
    
      const options = {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    
      const chartRef = useRef()
      const onClick = (e) =>{
        if(getElementAtEvent(chartRef.current, e).length > 0){
        const datasetIndexNum = getElementAtEvent(chartRef.current, e)[0].datasetIndex;
        const datapoint = getElementAtEvent(chartRef.current, e)[0].index;
        console.log(`dataset index:  ${datasetIndexNum} and dp: ${datapoint}`);
        }
       
      }
  
  return (
    modalsOpen && (    
    <div className={styles.wrapper}>
        <div className={styles.containers}>
            <div className={styles.closeButton} onClick={()=> setModalsOpen(false)} onKeyDown={()=> setModalsOpen(false)} tabIndex={0} role="button">
                <MdOutlineClose />
            </div>
            <div style={{
              width: '500px',
              height: '300px',
            }}>
               <Line data = {data} options = {options} onClick={onClick} ref ={chartRef}></Line>
            </div>
        </div>
    </div>
    )

  );
}

export default ChartModal;