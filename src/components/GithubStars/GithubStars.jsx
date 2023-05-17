import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const GithubStars = ({ username, repo }) => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

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
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {" "}
        <h4>Estrelas</h4>
        <div className="row">
          <div className="col text-center">
            <span
              className="bi bi-star-fill"
              style={{ fontSize: "100px", color: "gold" }}
            ></span>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <h3>{repos.stargazers_count}</h3>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GithubStars;
