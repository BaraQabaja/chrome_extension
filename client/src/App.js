import Button from "./components/button";
import "./App.css";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  //************passport config************************* */
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUser = axios
  //     .get("http://localhost:4000/auth/login/success")
  //     .then((response) => {
  //       if (response.status === 200) return response.json();
  //       throw new Error("authentication has been failed!");
  //     })
  //     .then((resObject) => {
  //       setUser(resObject.user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   getUser();
  // }, []);

  //******************************************************* */

  return (
    <div className="App">
      {/* <Login /> */}

      <>
        <Routes>
          <Route index path="/" element={<Login />} />
          {/* normal user */}
          <Route path="/home" element={<h1>home</h1>} />

          <Route path="*" element={<h1>Error</h1>} />
        </Routes>
      </>
    </div>
  );
}

export default App;
