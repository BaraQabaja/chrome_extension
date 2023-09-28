import Button from "./components/button";
import "./App.css";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}

      <>
        <Routes>
          <Route index path="/" element={<Login />} />
          {/* normal user */}
          <Route path="/home" element={<h1>home</h1>} />

          {/* <Route path="*" element={<h1>Error</h1>} /> */}
        </Routes>
      </>
    </div>
  );
}

export default App;
