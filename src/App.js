import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Root } from "./pages/Root/Root";
import { UserInfos } from "./components/UserInfos/UserInfos";
import { BuscaUser } from "./components/BuscaUser/BuscaUser";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import './components/ThemeToggle/theme.css';

export function App() {
  
  return (
      <div>
        <ThemeToggle />

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root/>}>
        <Route path="/" element={<BuscaUser />} />
        <Route path="/perfil/:userName" element={<UserInfos/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;