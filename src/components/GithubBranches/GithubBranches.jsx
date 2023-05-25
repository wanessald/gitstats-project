import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GithubBranches.css";

const GithubBranches = ({ username, repoName }) => {
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username && repoName) {
      axios
        .get(`http://api.github.com/repos/${username}/${repoName}/branches`)
        .then((response) => {
          setBranches(response.data);
        })
        .catch((error) => {
          setError(error.toString());
        });
    }
  }, [username, repoName]);

  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  return (
    <div className="card-insights-branches" >
        <h4 className="title-insights-branches">Branches</h4>
        <div className="row">
          <div className="col text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-tree" viewBox="0 0 16 16">
              <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777l-3-4.5zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507z"/>
            </svg>            
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <h3 className="number-insights-branches">{branches.length}</h3>
          </div>
        </div>
        </div>
  );
};

export default GithubBranches; 
