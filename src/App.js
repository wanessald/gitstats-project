import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { UserInfos } from "./pages/UserInfos/UserInfos";
import { Home } from "./pages/Home/Home";
import { useState } from "react";
import { ThemeContext } from "./components/contexts/ThemeContext";


export function App() {
  const [temaEscuro, setTemaEscuro] = useState(false);

  //alterna entre true e false toda vez que for chamada;
  function alternar() {
    if (temaEscuro === true) {
      setTemaEscuro(false);
    } else {
      setTemaEscuro(true);
    }
  }

  return (
    <>
    <ThemeContext.Provider
      value={{ temaEscuro: temaEscuro, alternar: alternar }}
    >
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root/>}>
        <Route path="/" element={<Home />} />
        <Route path="/perfil/:userName" element={<UserInfos/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  </ThemeContext.Provider>
    </>
  );
}

export default App;