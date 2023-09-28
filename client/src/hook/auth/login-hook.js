import React, { useState, useEffect } from "react";
// import notify from './../useNotifaction';
import { useDispatch, useSelector } from "react-redux";
import { postLogin, storeUserRole } from "../../Redux/authSlice";
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
  console.log("loginRes");

  console.log(loginRes);
  //Incorrect username or password
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
        username: username,
        password: password,
      })
    );

    setLoading(false);
    setIsPress(false);
  };

  useEffect(() => {
    console.log(loginRes)
    if (loading === false) {
      if (loginRes) {
        if (loginRes.token) {
          localStorage.setItem("token", loginRes.token);

          setTimeout(() => {
            navigate("home");
          }, 1000);
        } else if (loginRes === "Incorrect username or password") {
          localStorage.removeItem("token",loginRes.token);

          setMessage({
            flag: true,
            value: "Your username or password is uncorrect",
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
