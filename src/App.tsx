import { HashRouter, Routes, Route } from "react-router";
import "./App.css";
import Main from "./pages/Main/Main";
import Authorization from "./pages/Authorization/Authorization";

const App: React.FC = () =>  {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/authorization" element={<Authorization/>}/>

      </Routes>
    </HashRouter>
  );
}
export default App;
