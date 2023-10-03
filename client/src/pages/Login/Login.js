import { useState } from "react";
import classes from "./Login.module.css";
import LoginHook from "./../../hook/auth/login-hook";
import { useDispatch } from "react-redux";
import { postCreateUser } from "../../Redux/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [showReg, setShowReg] = useState(false);
  const [createEmail, setCreateEmail] = useState("");
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  const createUserFormHandler = async (event) => {
    event.preventDefault();

    await dispatch(
      postCreateUser({
        createEmail,
        createUsername,
        createPassword,
      })
    );
    setCreateEmail("");
    setCreateUsername("");
    setCreatePassword("");
  };

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
            <p>Email</p>
            <input
              required
              value={username}
              placeholder="Email"
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

        <p onClick={() => setShowReg(!showReg)}>Register ?</p>
        {showReg && (
          <form action="get" onSubmit={createUserFormHandler}>
            <input
              required
              placeholder="Email"
              type="email"
              name="createEmail"
              value={createEmail}
              onChange={(event) => setCreateEmail(event.target.value)}
            />

            <input
              placeholder="Username"
              required
              type="text"
              name="createUsername"
              value={createUsername}
              onChange={(event) => setCreateUsername(event.target.value)}
            />

            <input
              placeholder="password"
              required
              type="password"
              name="createPassword"
              value={createPassword}
              onChange={(event) => setCreatePassword(event.target.value)}
            />

            <input type="submit" value="Create" />
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
