import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPersonalInformation, putEditUsername } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { postLogout} from "../../Redux/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameDone, setUsernameDone] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const { personalInfo, statusOfFetchingPersonal, updateUsernameRes } =
    useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getPersonalInformation());
  }, []);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const logout = async() => {

      await dispatch(postLogout());
navigate('/')
  };
  const onSubmit = async (event) => {
    setShowUsernameInput(!showUsernameInput);

    event.preventDefault();
    await dispatch(
      putEditUsername({
        newUsername: username,
      })
    );
    setUsername("");

    await dispatch(getPersonalInformation());
    setUsernameDone(true);

    setTimeout(() => {
      setUsernameDone(false);
    }, 4000);
  };

  let data = {};
  let templateToShow = <h1>Error</h1>;
  if (personalInfo.Information) {
    data = personalInfo.Information;
    templateToShow = (
      <dev>
        <button onClick={logout}>Logout</button>
        <h1>Hi {personalInfo.Information.username}</h1>
        <button onClick={() => setShowUsernameInput(!showUsernameInput)}>
          Edit
        </button>

        {showUsernameInput && (
          <form onSubmit={(event) => onSubmit(event)}>
            <input type="submit" value="Submit" />

            <input
              style={{}}
              required
              value={username}
              type="text"
              placeholder="Username"
              onChange={(event) => onChangeUsername(event)}
            ></input>
          </form>
        )}
        <p>Your Email : {data.email}</p>
        {usernameDone && <h2>Done</h2>}
      </dev>
    );
  }
  //if there is no user Info that mean that there will send error message in the personalInfo.data so if there was a data parameter in the incomming res so that mean there is error and the user should be forworded to login page
  else {
    data = personalInfo;

    if (
      data == "The user that belong to this token does no longer exist" ||
      data == "Token is invalid"
    ) {
      localStorage.removeItem("token");
      templateToShow = <p>{personalInfo}</p>;
      setTimeout(function () {
        navigate("/");
      }, 10000); // Execute after 10 seconds
    }
  }

  return templateToShow;
};

export default Home;
