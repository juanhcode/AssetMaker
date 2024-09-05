import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="*" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
