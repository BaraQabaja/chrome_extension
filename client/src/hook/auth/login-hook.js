import React, { useState, useEffect } from "react";
// import notify from './../useNotifaction';
// import { useDispatch, useSelector } from "react-redux";
// import { postLogin, storeUserRole } from "../../Redux/loginSlice";
import { useNavigate } from "react-router-dom";

const LoginHook = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const [message, setMessage] = useState({
    flag: false,
    value: "",
  });
//   const {loginRes,statusOfLogin,userRole}=useSelector((state)=>state.login)

//Incorrect email or password
  const onChangeEmpId = (e) => {
    setEmpId(e.target.value);
   
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsPress(true);
    setLoading(true);
    // await dispatch(postLogin({
    //     id:empId,
    //     password:password
    // }))
  
    setLoading(false);
    setIsPress(false);
  };

  useEffect(() => {
    // if (loading === false) {
    //   if (loginRes) {
     
    //     if (loginRes.token) {
    //       localStorage.setItem("token", loginRes.token);
   

          
    //        localStorage.setItem("role",loginRes.employee.role)

          // dispatch(storeUserRole("employee"))
        //   setTimeout(() => {
        //    switch(loginRes.employee.role){
        //     case "employee":
        //       navigate("/")
        //       break;
        //       case "sec_manager":
        //       navigate("/depmanager")
        //       break;
        //       case "manager":
        //       navigate("/admin/home")
        //       break;
        //       default:
        //         navigate("/login")
        //    }
            
        //   }, 1500);
       // }

        // else if (loginRes === "Incorrect email or password") {
        //   localStorage.removeItem("token",loginRes.token);
        //   // localStorage.removeItem("user");
        //   // notify("كلمة السر او الايميل خطا", "error")
          
        //   setMessage({
        //     flag:true,
        //     value:"Your username or password is uncorrect"
        //   });
        // }
     
        // setLoading(true);
    //  }
    //}
 
  }, [loading]);

  return [
    empId,
    onChangeEmpId,
    password,
    loading,
    onChangePassword,
    onSubmit,
    isPress,
    message,
  ];
};

export default LoginHook;
