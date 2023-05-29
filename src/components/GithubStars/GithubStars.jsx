import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GithubStars.css";

const GithubStars = ({ username, repo }) => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [theme] = useState("light");

  useEffect(() => {
    if (username) {
      axios
        .get(`https://api.github.com/repos/${username}/${repo}`)
        .then((response) => {
          setRepos(response.data);
        })
        .catch((error) => {
          setError(error.toString());
        });
    }
  }, [username, repo]);

  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  return (
    <div className={`card-insights-stars ${theme}`}>
      <h4 className={`title-insights-stars ${theme}`}>Estrelas</h4>
      <div className="row">
        <div className="col text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill={theme === "light" ? "gold" : "white"}
            className={`bi bi-star-fill ${theme}`}
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <h3 className={`number-insights-stars ${theme}`}>
            {repos.stargazers_count}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GithubStars;
