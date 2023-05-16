import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Root } from "./pages/Root/Root";
import { UserInfos } from "./components/UserInfos/UserInfos";
import { BuscaUser } from "./components/BuscaUser/BuscaUser";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root/>}>
        <Route path="/" element={<BuscaUser />} />
        <Route path="/perfil/:userName" element={<UserInfos/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
