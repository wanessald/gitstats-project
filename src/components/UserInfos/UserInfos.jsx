import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Col, Row, Container, Button } from "react-bootstrap";
import axios from "axios";
import { GraphLanguage } from "../GraphLanguage/GraphLanguage";
import "./UserInfo.css";
import { ContributorsChart } from "../Contribuições/Contribuições";
import { Forks } from "../Forks/Forks";
import GithubStars from "../../components/GithubStars/GithubStars";
import { ArrowLeft } from 'react-bootstrap-icons';
import GithubBranches from "../../components/GithubBranches/GithubBranches";
import { InsightChart } from "../LineGraph/LineGraph";
import ShareInfo from "../../components/ShareInfo/ShareInfo";

export function UserInfos() {
  const { userName } = useParams();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [sortedRepos, setSortedRepos] = useState([]);

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

     useEffect(() => {
        axios
        .get(`https://api.github.com/users/${userName}/repos?sort=updated`)
        .then((response) => {
          const sortedRepos = response.data.sort((a, b) => {
            return b.updated_at.localeCompare(a.updated_at);
          });
          setRepos(sortedRepos);
      });
  }, [userName]);
 

  return (
    <main style={{backgroundColor:"#151414",  paddingBottom:"4%", paddingTop:"3%"}}>
      {userData && (
        <>
<Container className="content p-4">
            <Row className="row-principal">
              <Row style={{ height: "8%" }}>
                <Col md={1}>
                  <div>
                   
                      <Link to="/">
                        <ArrowLeft color="#D9D9D9" size={35} />
                      </Link>
                  
                  </div>
                </Col>
              </Row>
              <Col md={6}>
                <div className="card-align">
                  <Card
                    className="card d-flex"
                    style={{
                      borderRadius:"15px",
                      width: "22rem",
                      height: "32rem",
                      marginLeft: "15%",
                      backgroundColor: "#37393B",
                    }}
                  >
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
                      <Card.Title
                        style={{ textAlign: "center", color: "#fcfcfc" }}
                      >
                        {userData.name}
                      </Card.Title>
                      {userData.bio ? (
                        <p className="bio">"{userData.bio}"</p>
                      ) : (
                        <p className="bio">
                          <i>sem biografia</i>
                        </p>
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
                        <p className="update-perfil">
                          Perfil Atualizado:
                          {Intl.DateTimeFormat("pt-br").format(
                            new Date(userData.updated_at)
                          )}
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>

              <Col className="colun-2" md={6}>
                <div className="scroll">
                  {repos.map((repo) => (
                    <button
                      title={repo.updated_at.toLocaleString()}
                      style={{ height: 78 }}
                      className="button-repo"
                      onClick={() => handleRepoClick(repo.id)}
                    > 
                      {repo.name}
                    </button>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>


          {repos.map((repo) => {
            if (repo.id === selectedRepo) {
              return (
                <>
                  <Container className="content-repos ">
                    <Row className="pt-2">
                      <Col md={4}>
                        <div className="info-repo pt-1">
                          <h4>{repo.name}</h4>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="info-repo">
                          <p className="repo-p pt-2">
                            <b>
                              Data de criação:
                              {Intl.DateTimeFormat("pt-br").format(
                                new Date(repo.created_at)
                              )}
                            </b>
                             
                            </p>
                         
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="info-repo">
                          <p className="repo-p pt-1">
                            <b>
                              {" "}
                              {repo.language ? (
                                <p>Linguagem {repo.language}</p>
                              ) : (
                                <p>Não contém linguagens.</p>
                              )}
                            </b>
                          </p>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="button-github">
                          <Button
                            className="btn-light mr-3"
                            target="_blank"
                            href={repo.html_url}
                          >
                            Ir para o Github
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-github"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                          </Button>
                          <ShareInfo owner={userName} repo={repo.name} />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  <Container key={repo.id} className="content" style={{height:"auto",backgroundColor:"#151414", marginTop:"1%"}}>
                    <Row>
                      <Col md={8}>
                        <div className="desc-repo">
                          {repo.description ? (
                            <p className="repo-desc">
                              Descrição do Repositório: {repo.description}
                            </p>
                          ) : (
                            <p className="repo-desc pt-2">
                              Esse Repositório não contém descrição.
                            </p>
                          )}
                        </div>
                        <Col>
                        <Row className="mb-3">
                          <Col>
                          <GithubStars username={userName} repo={repo.name} />
                          </Col>
                          <Col>
                          <Forks dono={userName} repo={repo.name} />
                          </Col>
                          <Col>
                          
                          <GithubBranches username={userName} repoName={repo.name} />   
                          </Col>
                        </Row>
                         
                        </Col>
                        <Col>
                          <ContributorsChart dono={userName} repo={repo.name} />
                          </Col>
                      </Col>
                      <Col md={4}>
                        <GraphLanguage dono={userName} repo={repo.name} />
                   
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <InsightChart userName={userName} repo={repo.name} />
                      </Col>
                    </Row>
                    <Row>
                    </Row>
                  </Container>
                </>
              );
            } else {
              return null;
            }
          })}
        </>
      )}
    </main>
  );
}
