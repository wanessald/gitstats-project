//InsightChart.jsx
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function InsightChart({ userName, repo }) {

  const [graphData, setGraphData] = useState({labels:[],datasets:[]});
  const [graphOptions, setGraphOptions] = useState({});
  const [commitStats, setCommitStats] = useState([]);


  useEffect(() => {
    axios
      .get(
        `https://api.github.com/repos/${userName}/${repo}/commits`
      )
      .then((response) => {
        let statsPerYearMonth = {};
        for(let i=0;i<response.data.length;i++){
          let dateStr = response.data[i].commit.committer.date;
          let yy = dateStr.substring(0,4);
          let mm = dateStr.substring(5,7);
          let yearMonth = yy+mm;
          if(yearMonth in statsPerYearMonth){
            statsPerYearMonth[yearMonth]+=1;
          }else{
            statsPerYearMonth[yearMonth]=0;
          }
        }

        let statsPerYearMonthArray = Object.entries(statsPerYearMonth);
        statsPerYearMonthArray.sort();

        let newLabels = [];
        let newData = [];

        for(let i=0;i<statsPerYearMonthArray.length;i++){
          let yearMonth = statsPerYearMonthArray[i][0];
          let yearMonthFmt = yearMonth.substring(4,6)+'/'+yearMonth.substring(0,4);
          statsPerYearMonthArray[i].push(yearMonthFmt);
          newLabels.push(yearMonthFmt);
          newData.push(statsPerYearMonthArray[i][1]);
        }
        
     
        let newGraphData = {
          labels: newLabels,
          datasets: [
            {
              label: 'Nº de Commits',
              data: newData,
              borderColor: 'rgb(102, 0, 122)',
              backgroundColor: 'rgba(241, 111, 4)',
            },
          ],
        };

        let newOptions = {
          scales: {
              y: {
                  min: 0,
                  ticks: {
                      stepSize: 1,
                      beginAtZero: false,
                  }
              }
          }
        };

        setGraphData(newGraphData);
        setGraphOptions(newOptions);
        setCommitStats(statsPerYearMonthArray);
      })
      .catch((error) => {
        //setCommitDates([error.message]);
        console.log(error);
      });
  }, [userName, repo]);
  
  return (
    <div className="commits-graph">
        <h4 style={{textAlign:"center", color:"aliceblue", marginBottom:"0%"}}>Commits</h4>


        {commitStats ? (
        <>
        <Line options={graphOptions} data={graphData} />
        </>
        ) : (
        <p>Esse Repositório não contém dados de Commits...</p>
      )}
    </div>
    
  );
}        
