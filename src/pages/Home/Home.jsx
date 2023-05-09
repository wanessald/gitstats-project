import { Form, Button } from "react-bootstrap";
import axios from "axios";
import lupa from "../../assets/lupa.png";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style-home.css"

export function Home() {
    const [userName, setUserName] = useState('');
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);

  
    const handleUsernameSearch = (event) => {
      setUserName(event.target.value);
    };
  
    const handleSearch = () => {
      axios.get(`https://api.github.com/users/${userName}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    useEffect(() => {
      axios
        .get(`https://api.github.com/users/${userName}/repos`)
        .then((response) => {
          setRepos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [userName]);
    
  return (
    <div className="container-app">
        <div className="container">
        <header className="header-top">
        <h1>Git Stats</h1>
        </header>
    <main>
    <div className="form">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Encontre o repositório que desejar</Form.Label> <br />
          <Form.Control type="text" placeholder="Digite o nome do usuário" onChange={handleUsernameSearch} value={userName} />
          <Button variant="primary" type="button" onClick={handleSearch}>
            <img className="busca" src={lupa} alt="bjdbajhb"></img>
          </Button>
        </Form.Group>
      </Form>
      </div>
      {userData && (
        <div className="content">
          
         <div>
          <img src={userData.avatar_url} alt={userData.login} />
          <h2>Nome: {userData.name}</h2>
          <p>Bio: {userData.bio}</p>
          <p>Repositórios:{userData.public_repos}</p>
          <p>Criado:{Intl.DateTimeFormat('pt-br').format(new Date(userData.created_at))}</p>
          <p>Atualizado:{Intl.DateTimeFormat('pt-br').format(new Date(userData.updated_at))}</p>
         
    <h1>Meus repositórios no Github</h1>
    <ul>
    
    {/* esse slice determina que serão exibidos apenas 5 repositórios, mas esse valor pode ser diferente */}
    {repos.slice(0, 5).map((repo) => {
    return (
      // Repo.name é a váriável que trás os repositórios de acordo com o nome do usuário
      <li key={repo.name}>

      {/* Intl é um tipo de formatação de alguns dados de acordo com a localização */}
        {Intl.DateTimeFormat('pt-br').format(new Date(repo.created_at))}

      {/* repo.url são os links do repositório do usuário */}
        <Link to={repo.html_url} target="_blank">{repo.html_url}</Link> 

      {/* Nome do repositório */}
        {repo.name} 
      </li>
      )})}
 </ul>

        </div>
        </div>
      )}
      
    </main>
        </div>
       
    </div>
  );
}
