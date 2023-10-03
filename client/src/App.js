import "./App.css";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        
          <Route path="*" element={<h1>Error </h1>} />
        </Routes>
      </>
    </div>
  );
}

export default App;
