import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { UserInfos } from "./components/UserInfos/UserInfos";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import './components/ThemeToggle/theme.css';
import { Home } from "./pages/Home/Home";

export function App() {
  
  return (
      <div>
        <ThemeToggle />

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root/>}>
        <Route path="/" element={<Home />} />
        <Route path="/perfil/:userName" element={<UserInfos/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;