import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LineGraph.css";
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
} from "chart.js";
import { Line } from "react-chartjs-2";

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
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
  const [graphOptions, setGraphOptions] = useState({});
  const [commitStats, setCommitStats] = useState([]);
  const [theme] = useState("light");

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${userName}/${repo}/commits`)
      .then((response) => {
        let statsPerYearMonth = {};
        for (let i = 0; i < response.data.length; i++) {
          let dateStr = response.data[i].commit.committer.date;
          let yy = dateStr.substring(0, 4);
          let mm = dateStr.substring(5, 7);
          let yearMonth = yy + mm;
          if (yearMonth in statsPerYearMonth) {
            statsPerYearMonth[yearMonth] += 1;
          } else {
            statsPerYearMonth[yearMonth] = 0;
          }
        }

        let statsPerYearMonthArray = Object.entries(statsPerYearMonth);
        statsPerYearMonthArray.sort();

        let newLabels = [];
        let newData = [];
        for (let i = 0; i < statsPerYearMonthArray.length; i++) {
          let yearMonth = statsPerYearMonthArray[i][0];
          let yearMonthFmt = yearMonth.substring(4, 6) + "/" + yearMonth.substring(0, 4);
          statsPerYearMonthArray[i].push(yearMonthFmt);
          newLabels.push(yearMonthFmt);
          newData.push(statsPerYearMonthArray[i][1]);
        }

        let newGraphData = {
          labels: newLabels,
          datasets: [
            {
              fill: true,
              label: "Nº de Commits",
              data: newData,
              borderColor: getBorderColor(),
              backgroundColor: getBackgroundColor(),
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
              },
            },
          },
        };

        setGraphData(newGraphData);
        setGraphOptions(newOptions);
        setCommitStats(statsPerYearMonthArray);
      })
      .catch((error) => {
        console.log(error);
      });
  },);

  const getBorderColor = () => {
    if (theme === "light") {
      return "rgba(255, 255, 0, 1)";
    } else if (theme === "dark") {
      return "rgba(0, 255, 255, 1)";
    }
  };

  const getBackgroundColor = () => {
    if (theme === "light") {
      return "rgba(255, 0, 255, 1)";
    } else if (theme === "dark") {
      return "rgba(0, 0, 0, 1)";
    }
  };

  return (
    <div className={`commits-graph ${theme}`}>
      <h4 className="title-commit">Commits</h4>
      {commitStats ? (
        <Line style={{ width: "70%", alignContent: "center" }} options={graphOptions} data={graphData} />
      ) : (
        <p>Esse Repositório não contém dados de Commits...</p>
      )}
    </div>
  );
}
