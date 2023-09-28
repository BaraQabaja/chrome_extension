import { useState, useEffect } from "react";
import classes from "./Login.module.css";
import LoginHook from "./../../hook/auth/login-hook";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const Login = () => {
  // const [password, setPassword] = useState("");
  // const [empNum, setEmpNum] = useState("");
  const [
    username,
    onChangeUsername,
    password,
    loading,
    onChangePassword,
    onSubmit,
    isPress,
    message,
  ] = LoginHook();
//++++++++++++++++++++++++++++++++

// const [posts, setPosts] = useState([]);

// const fetchPost = async () => {
//   try {
//     const res = await axios.post("http://127.0.0.1:4000/api/login", {
//         id:1,
//         password: "0599",
//       });
// console.log("hi",res)
//     setPosts(res.data.id);
//   } catch (err) {
//     console.error(err);
//   }
// };

// useEffect(()=> {

//   fetchPost();

// }, [])


//++++++++++++++++++++++++++++++++++++
// useEffect(async() => {
//    async function fetchd (){
//         const res = await axios.post("/login", {
//             id:1,
//             password: "0599",
//           });

//           return res
//     }
    
    
//       console.log(  fetchd());
// }, []);

const navigate=useNavigate()
const facebookLoginHandler=()=>{
    // fetchPost();
    navigate("home")

}
const googleLoginHandler=()=>{
    
}

  const { flag, value } = message;

  return (
    <div className={classes.container}>
      <div className={classes.form_container}>
        {isPress ? (
          loading ? (
            <h4 style={{ position: "absolute", top: "5rem" }}>loading...</h4>
          ) : null
        ) : null}
        <form onSubmit={(e) => onSubmit(e)}>
          <label>
            <p>Username</p>
            <input
              required
              value={username}
              placeholder="username"
              onChange={(e) => onChangeUsername(e)}
            />
          </label>
          <label>
            <p>password</p>
            <input
              required
              value={password}
              type="password"
              placeholder="password "
              onChange={(e) => onChangePassword(e)}
            />
          </label>
          {flag && <h5 style={{ color: "red" }}>{value}</h5>}
          <input type="submit" value="login" />
        </form>

        <button className={classes.facebook_btn} onClick={facebookLoginHandler}>Facebook</button>
        <button className={classes.google_btn} onClick={googleLoginHandler}>Google</button>
      </div>
    </div>
  );
};

export default Login;
