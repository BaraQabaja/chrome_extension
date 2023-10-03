import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../Redux/authSlice";
import { useNavigate } from "react-router-dom";

const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const [message, setMessage] = useState({
    flag: false,
    value: "",
  });
  const { loginRes, statusOfLogin } = useSelector((state) => state.auth);
 
  //Incorrect email or password
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsPress(true);
    setLoading(true);

    await dispatch(
      postLogin({
        email: username,
        password: password,
      })
    );

    setLoading(false);
    setIsPress(false);
  };

  useEffect(() => {
    //to keep user logged in if he has a token after he prev logged in
    // if(localStorage.getItem("token")){
    //   navigate("home");
    // }
    console.log(loginRes)
    if (loading === false) {
      if (loginRes) {
        if (loginRes.token) {
          localStorage.setItem("token", loginRes.token);

          setTimeout(() => {
            navigate("home");
          }, 1000);
        } else if (loginRes === "Incorrect email or password") {
          localStorage.removeItem("token",loginRes.token);

          setMessage({
            flag: true,
            value: "Your email or password is Incorrect",
          });
        }

        setLoading(true);
      }
    }
  }, [loading]);

  return [
    username,
    onChangeUsername,
    password,
    loading,
    onChangePassword,
    onSubmit,
    isPress,
    message,
  ];
};

export default LoginHook;
