import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Col, Row, Container, Button} from "react-bootstrap";
import axios from "axios";
import { GraphLanguage } from "../../components/GraphLanguage/GraphLanguage";
import "./UserInfo.css";
import { ContributorsChart } from "../../components/Contribuições/Contribuições";
import { Forks } from "../../components/Forks/Forks";
import GithubStars from "../../components/GithubStars/GithubStars";
import { ArrowLeft } from 'react-bootstrap-icons';
import GithubBranches from "../../components/GithubBranches/GithubBranches";
import { InsightChart } from "../../components/LineGraph/LineGraph";
import ShareInfo from "../../components/ShareInfo/ShareInfo";
import { PDFButton } from "../../components/PDFButton/PDFButton";


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
              <Row className="arrow-size">
                <Col md={1}>
                  <div>
                    <Link to="/">
                      <ArrowLeft className="arrow" size={35} />
                    </Link>
                  </div>
                </Col>
              </Row>
              <Col md={6}>
                <div className="card-align">
                  <div
                    className="card-color"
                  >
                    <Link to={userData.html_url} target="_blank">
                      <img
                        className="imagem-card"
                        variant="top"
                        alt="usuário"
                        src={userData.avatar_url}
                      />
                    </Link>

                    
                      < div className="username-card">
                        {userData.name}
                   
                      {userData.bio ? (
                        <p className="bio">"{userData.bio}"</p>
                      ) : (
                        <p className="bio">
                          <i>sem biografia</i>
                        </p>
                      )}

                     
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
                       
                  </div>
                </div>
                </div>
              
              </Col>

              <Col className="colun-2" md={6}>
                <div className="scroll">
                  {repos.map((repo) => (
                    <button
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
                    <Row >
                    <Col md={3}>
                        <div className="info-repo">
                        <Button variant="dark" className="button-pdf">
                        <PDFButton userData={userData} repos={repos} selectedRepo={selectedRepo} />
                        </Button>
                        </div>
                      </Col>
                    <Col md={3}>
                        <div className="info-repo ">
                          <Link
                            target="_blank"
                            title="abrir no github"
                            to={repo.html_url}
                            className="link-repo"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19"
                              height="19"
                              fill="currentColor"
                              class="bi bi-box-arrow-up-right"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                              />
                              <path
                                fill-rule="evenodd"
                                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                              />
                            </svg>{" "}
                            {repo.name}
                          </Link>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="info-repo">
                        <h5 className="date-repo">
                        {Intl.DateTimeFormat("pt-br").format(new Date(repo.created_at))}
                        </h5>
                        </div>
                      </Col>
                      <Col md={3}>
                        
                          <ShareInfo owner={userName} repo={repo.name} />
                        
                      </Col>
                    </Row>
                  </Container>

                  <Container key={repo.id} className="content-infos mt-3">
                    <Row>
                      <Col md={8} style={{padding:"0"}}>
                        <div className="desc-repo">
                          {repo.description ? (
                            <p className="repo-desc">
                              Descrição: {repo.description}
                            </p>
                          ) : (
                            <p className="repo-desc pt-2">
                              Esse Repositório não contém descrição.
                            </p>
                          )}
                        </div>
                        <Col>
                        <Row className="mb-3">
                          <Col className="mt-3" >
                          <GithubStars username={userName} repo={repo.name} />
                          </Col>
                          <Col className="mt-3" >
                          <Forks dono={userName} repo={repo.name} />
                          </Col>
                          <Col className="mt-3" >
                          
                          <GithubBranches username={userName} repoName={repo.name} />   
                          </Col>
                        </Row>
                         
                        </Col>
                        <Col style={{padding:"0"}}>
                        <InsightChart userName={userName} repo={repo.name} />
                         
                          </Col>
                      </Col>
                      <Col md={4} style={{padding:"0"}}>
                        <GraphLanguage dono={userName} repo={repo.name} />
                   
                      </Col>
                    </Row>
                    <Row className="pt-3">
                      <Col style={{padding:"0"}}>
                      <ContributorsChart dono={userName} repo={repo.name} />
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
