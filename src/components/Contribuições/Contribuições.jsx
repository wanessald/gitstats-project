import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export function ContributorsChart({ dono, repo }) {
  const [contributorsData, setContributorsData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${dono}/${repo}/contributors`)
      .then((response) => {
        const contributors = response.data;
        let labels = [];
        let dataset = [];
        for (let contributor of contributors) {
          labels.push(contributor.login);
          dataset.push(contributor.contributions);
        }
        
        const data = {
          labels: labels,
          datasets: [
            {
              label: "Contributions",
              data: dataset,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
          ],
        };

        setContributorsData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dono, repo]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Contribuidores e Contribuições',
      },
    },
  };

  return (
    <div style={{ height: 300 }}>

      {contributorsData ? (
        <Bar data={contributorsData} options={options} />
      ) : (
        <p>Loading contributors data...</p>
      )}
    </div>
  );
}
