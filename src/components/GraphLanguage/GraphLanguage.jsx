// GraphLanguage

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../UserInfos/UserInfo.css";


ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function GraphLanguage(parametros) {
  const [graphData, setGraphData] = useState(data);

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/repos/${parametros.dono}/${parametros.repo}/languages`
      )
      .then((response) => {
        let ddata = {
          labels: Object.keys(response.data),
          datasets: [
            {
              label: "# of Votes",
              data: Object.values(response.data),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        setGraphData(ddata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [parametros.dono, parametros.repo]);
    return (
        <div style={{height: 300}}>
          <h4>Linguagem mais usada {parametros.dono} {parametros.repo}</h4>
          <Doughnut data={graphData} />
        </div>
    );
}
