import { HashRouter, Routes, Route } from "react-router";
import "./App.css";
import Main from "./pages/Main/Main";
import Authorization from "./pages/Authorization/Authorization";
import Admin from "./pages/Admin/Admin";

const App: React.FC = () =>  {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/authorization" element={<Authorization/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </HashRouter>
  );
}
export default App;
