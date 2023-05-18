import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

export function BuscaUser() {
  const [userName, setUserName] = useState("");

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
    window.location.href = `/perfil/${userName}`;
  };


  return (
    <div className="container-app" style={{ backgroundColor: "#181719" }}>
      <div className="container">
        <header className="header-top">
          <h1>Git Stats</h1>
        </header>

        <main style={{ backgroundColor: "#181719" }}>
          <div className="form">
            <Form>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  className="input-name-user"
                  placeholder="Digite o nome do usuário"
                  onChange={handleUsernameSearch}
                  onKeyDown={handleKeyDown}
                  value={userName}
                />
                <Button variant="primary" type="button" onClick={handleSearch}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </Button>
              </InputGroup>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}
