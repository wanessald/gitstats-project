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
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
        let statsPerYearMonth = {}; // Cria obj que vai armazenar as estatísticas
        for(let i=0;i<response.data.length;i++){ // loop repetirá enquanto i for menor que o response.data
          // extrai a data do response.data, em seguida o ano e o mês
          let dateStr = response.data[i].commit.committer.date;
          let yy = dateStr.substring(0,4);
          let mm = dateStr.substring(5,7);
          let yearMonth = yy+mm; // cria uma key 
          if(yearMonth in statsPerYearMonth){
            // se a chave existir, incrementa o valor associado à chave em 1
            statsPerYearMonth[yearMonth]+=1;
          }else{
            statsPerYearMonth[yearMonth]=0;
          }
        }
        // converte os dados em array
        let statsPerYearMonthArray = Object.entries(statsPerYearMonth);
        statsPerYearMonthArray.sort();

        let newLabels = [];
        let newData = [];
        // o loop repetirá enquanto for menor que o comprimento 
        // da matriz statsPerYearMonth
        for(let i=0;i<statsPerYearMonthArray.length;i++){
          // extrai o ano e mês do array
          let yearMonth = statsPerYearMonthArray[i][0];
          // combina os dados extraidos acima, a substring extrai os
          // caracteres dos argumentos e os combina em uma nova string 
          let yearMonthFmt = yearMonth.substring(4,6)+'/'+yearMonth.substring(0,4);
          // adiciona a string yearMonthFmt ao "Stats.." no indice i
          statsPerYearMonthArray[i].push(yearMonthFmt);
          // o push adiciona a yearMonthFmt ao array newLabels(rotulos)
          newLabels.push(yearMonthFmt);
          // o push adiciona o numero armazenado em stats ao indice i
          // da matriz newData(dados do grafico)
          newData.push(statsPerYearMonthArray[i][1]);
        }
        
     
        let newGraphData = {
          labels: newLabels,
          datasets: [
            {
              fill: true,
              label: 'Nº de Commits',
              data: newData,
              borderColor: 'rgba(255, 255, 0, 1)',
              backgroundColor: 'rgba(255, 0, 255, 1',
            },
          ],
        };

        let newOptions = {
          responsive: true,
          type: "line",
          tension: 0.3,
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
    <div className="commits-graph" style={{ width: "100%"}}>
        <h4 style={{ color: "aliceblue", textAlign: "center"}}>Commits</h4>
        {commitStats ? (
        <>
        <Line style={{ width: "70%", alignContent: "center"}} options={graphOptions} data={graphData} />
        </>
        ) : (
        <p>Esse Repositório não contém dados de Commits...</p>
      )}
    </div>
    
  );
}        
