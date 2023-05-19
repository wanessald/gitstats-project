import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./Contribuicoes.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
              label: "Contribuições",
              data: dataset,
              backgroundColor: [
                "rgba(  0 , 0 , 255)",
                "rgba( 255 , 0 , 255)",
                "rgba( 255 , 255 , 0)",
                " rgba( 255 , 128 , 0)",
                " rgba(0 , 255 , 0)",
              ],
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
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  return (
    <div className="contrib-graph" style={{height:"25rem"}}>
      
      {contributorsData ? (
        <>
        <h5 style={{textAlign:"center", color:"aliceblue", marginBottom:"0%"}}>Contribuidores e Contribuições</h5>
        <Bar style={{height:"94%"}} data={contributorsData} options={options} />
        </>
      ) : (
        <p>Esse Repositório não contém dados de contribuições...</p>
      )}
    </div>
  );
}
