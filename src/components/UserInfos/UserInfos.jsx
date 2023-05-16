import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Col, Row, Container, Button } from "react-bootstrap";
import axios from "axios";
import { GraphLanguage } from "../GraphLanguage/GraphLanguage";
import "./UserInfo.css";

export function UserInfos() {
  const { userName } = useParams();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleRepoClick = (id) => {
    setSelectedRepo(id);
  };

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${userName}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userName]);

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
    <>
      {userData && (
        <>
          <Container className="content p-4">
            <Row>
              <Col md={6}>
                <div>
                  <Card style={{ width: "22rem" ,height:"500px" }} >
                    <Link to={userData.html_url} target="_blank">
                      <Card.Img
                        variant="top"
                        style={{
                          width: "70%",
                         
                          marginLeft: "15%",
                          marginTop: "5%",
                          borderRadius: "50%",
                        }}
                        src={userData.avatar_url}
                      />
                    </Link>

                    <Card.Body>
                      <Card.Title style={{ textAlign: "center" }}>
                        {userData.name}
                      </Card.Title>
                      {userData.bio ? (
                        <p className="bio">"{userData.bio}"</p>
                      ) : (
                        <p className="bio"><i>sem biografia</i></p>
                      )}
                      
                      <Card.Text>
                        <Row>
                          <Col md={4}>
                            <div className="info-perfil">
                              <p>
                                <b>{userData.public_repos}</b>
                                <br />
                                Repositórios
                              </p>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="info-perfil">
                              <p>
                                <b> {userData.followers}</b>
                                <br />
                                Seguidores
                              </p>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="info-perfil ml={2}">
                              <p>
                                <b> {userData.following}</b>
                                <br />
                                Seguindo
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                    <p className="update-perfil">
                      Perfil Atualizado:
                      {Intl.DateTimeFormat("pt-br").format(
                        new Date(userData.updated_at)
                      )}
                    </p>
                  </Card>
                </div>
              </Col>

              <Col md={6}>
                <div className="scroll mb-3" style={{height:"500px"}}>
                  {repos.map((repo) => (
                    <div className="box">
                      <Button
                        className="secondary mt-2"
                        style={{ width: "90%" }}
                        onClick={() => handleRepoClick(repo.id)}
                      >
                        {repo.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
          <Container className="infos-repos p-1">
            {repos.map((repo) => {
              if (repo.id === selectedRepo) {
                return (
                  <Container
                    key={repo.id}
                    style={{
                      marginTop: "30px",
                      backgroundColor: "lightgray",
                      padding: "5%",
                    }}
                  >
                    <h1>{repo.name}</h1>

                    <p>
                      Data de criação:{" "}
                      {Intl.DateTimeFormat("pt-br").format(
                        new Date(repo.created_at)
                      )}{" "}
                    </p>
                    {repo.language? (
                       <p>Linguagem: {repo.language}</p>
                      ) : (
                        <p>Esse Repositório ainda não contém linguagens.</p>
                      )}
                      
                      {repo.description ? (
                        <p>Descrição do Repositório: {repo.description}</p>
                      ) : (
                        <p>Esse Repositório não contém descrição.</p>
                      )}
                  
                    <br />
                   
                      <GraphLanguage dono={userName} repo={repo.name} />
                    
                    <br />
                    <br />

                    <Button
                      style={{ width: "25%" }}
                      variant="primary"
                      target="_blank"
                      href={repo.html_url}
                    >
                      Abrir no Github
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-github"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </Button>
                  </Container>
                );
              } else {
                return null;
              }
            })}
          </Container>
        </>
      )}
    </>
  );
}
