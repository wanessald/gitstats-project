import { useState, useEffect } from "react";
import axios from "axios";
import "./Forks.css";

export function Forks({ dono, repo }) {
  const [forkCount, setForkCount] = useState(null);
  const [theme] = useState("light");

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${dono}/${repo}/forks`)
      .then((response) => {
        setForkCount(response.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dono, repo]);

  return (
    <div className={`card-insights-forks ${theme}`}>
      <h4 className={`title-insights-forks ${theme}`}>Forks</h4>
      <div className="row">
        <div className="col text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill={theme === "light" ? "white" : "black"}
            className={`bi bi-git ${theme} forks-icon` }
            viewBox="0 0 16 16"
          >
            <path d="M15.698 7.287 8.712.302a1.03 1.03 0 0 0-1.457 0l-1.45 1.45 1.84 1.84a1.223 1.223 0 0 1 1.55 1.56l1.773 1.774a1.224 1.224 0 0 1 1.267 2.025 1.226 1.226 0 0 1-2.002-1.334L8.58 5.963v4.353a1.226 1.226 0 1 1-1.008-.036V5.887a1.226 1.226 0 0 1-.666-1.608L5.093 2.465l-4.79 4.79a1.03 1.03 0 0 0 0 1.457l6.986 6.986a1.03 1.03 0 0 0 1.457 0l6.953-6.953a1.031 1.031 0 0 0 0-1.457"/>
          </svg>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <h3 className={`number-insights-forks ${theme}`}>{forkCount}</h3>
        </div>
      </div>
    </div>
  );
}

