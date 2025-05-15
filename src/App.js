import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Main from "./pages/Main/Main";
import Authorization from "./pages/Authorization/Authorization";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/authorization" element={<Authorization/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
