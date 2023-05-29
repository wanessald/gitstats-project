// GraphLanguage.js

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./GraphLanguage.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(  0 , 0 , 255)",
        "rgba( 255 , 0 , 255)",
        "rgba( 255 , 255 , 0)",
        " rgba( 255 , 128 , 0)",
        " rgba(0 , 255 , 0)",
      ],
      borderColor: [
        "rgba(  0 , 0 , 255)",
        "rgba( 255 , 0 , 255)",
        "rgba( 255 , 255 , 0)",
        " rgba( 255 , 128 , 0)",
        " rgba(0 , 255 , 0)",
      ],
      borderWidth: 1,
    },
  ],
};

export function GraphLanguage(parametros) {
  const [graphData, setGraphData] = useState(data);
  const [theme] = useState("light");

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
              backgroundColor: getBackgroundColor(response.data),
              borderColor: getBorderColor(response.data),
              borderWidth: 1,
            },
          ],
        };
        setGraphData(ddata);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const getBackgroundColor = (data) => {
    if (theme === "light") {
      return ["rgba(  0 , 0 , 255)", "rgba( 255 , 0 , 255)", "rgba( 255 , 255 , 0)", " rgba( 255 , 128 , 0)", " rgba(0 , 255 , 0)"];
    } else if (theme === "dark") {
      // Cores para o tema dark
      return ["rgba( 255 , 0 , 0)", "rgba( 0 , 255 , 255)", "rgba( 255 , 255 , 255)", " rgba( 0 , 128 , 255)", " rgba(255 , 255 , 0)"];
    }
  };

  const getBorderColor = (data) => {
    if (theme === "light") {
      return ["rgba(  0 , 0 , 255)", "rgba( 255 , 0 , 255)", "rgba( 255 , 255 , 0)", " rgba( 255 , 128 , 0)", " rgba(0 , 255 , 0)"];
    } else if (theme === "dark") {
      // Cores para o tema dark
      return ["rgba( 255 , 0 , 0)", "rgba( 0 , 255 , 255)", "rgba( 255 , 255 , 255)", " rgba( 0 , 128 , 255)", " rgba(255 , 255 , 0)"];
    }
  };

  return (
    <div className={`graph-language ${theme}`}>
      <h4 className={`titulo-graph ${theme}`}>Linguagem mais usada</h4>
      <h6 className={`sub-graph ${theme}`}>{parametros.repo}</h6>
      <br /> <br />
      <Doughnut className="Doughnut" data={graphData} />
    </div>
  );
}
