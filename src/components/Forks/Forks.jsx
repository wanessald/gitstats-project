import { useState, useEffect } from "react";
import axios from "axios";


export function Forks({ dono, repo }) {
  const [forkCount, setForkCount] = useState(null);

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

  return <p style={{backgroundColor:"grey", color:"black"}}>Número de forks: {forkCount}</p>;
}
