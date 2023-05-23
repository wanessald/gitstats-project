import { useState } from "react";
import { Form, Button, InputGroup, Modal } from "react-bootstrap";

import "./BuscarUser.css";
import axios from "axios";

export function BuscaUser() {
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleUsernameSearch = (event) => {
    setUserName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    axios
      .get(`https://api.github.com/users/${userName}`)
      .then((response) => {
        // Usuário encontrado, redirecionar para a página do perfil
        window.location.href = `/perfil/${userName}`;
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Usuário não encontrado, exibir o modal
          setShowModal(true);
        } else {
          console.error(error);
        }
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <style>{`body {background-color: #151414;}`}</style>

      <div className="container-app" style={{ backgroundColor: "#181719" }}>
        <div className="container">
          <header className="header-top">
            <h1 style={{ fontFamily: "Karla" }}>GitStats</h1>
            <h2>
              Pesquise por perfis e acompanhe as estatísticas de seus usuários e
              repositórios de maneira regular.
            </h2>
          </header>

          <main style={{ backgroundColor: "#181719" }}>
            <div className="form">
              <Form>
                <InputGroup className="mb-3 busca">
                  <Form.Control
                    type="text"
                    className="input-name-user"
                    placeholder="Digite o nome do usuário"
                    onChange={handleUsernameSearch}
                    onKeyDown={handleKeyDown}
                    value={userName}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    style={{ backgroundColor: "#fff" }}
                    onClick={handleSearch}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#181719"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </Button>
                </InputGroup>
                <div className="link-container">
                <Button
                    variant="link"
                    target="_blank"
                    href={
                      "https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home"
                    }
                  >
                   
                    Não tem conta no GitHub Cadastre-se!
                  </Button>
                </div>
              </Form>

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Usuário não encontrado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  O nome de usuário informado não existe no Github. Por favor, insira um nome de
                  usuário válido.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="dark" onClick={handleCloseModal}>
                    Fechar
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
