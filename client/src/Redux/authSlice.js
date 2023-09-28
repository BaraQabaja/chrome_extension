import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postLogin = createAsyncThunk("login/postLogin", async (data) => {
  console.log("i am in login post login ");

  console.log(data);
  console.log("data");
  const res = await axios.post("http://127.0.0.1:4000/api/login", {
    username: data.username,
    password: data.password,
  });
  console.log("res.data");
  console.log(res);
  return await res.data;
});

//logout
// export const postLogout = createAsyncThunk("logout/postLogout", async () => {
//   const config = {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//   }
//   const res = await axios.post("/logout","hi",config);
//   console.log("logoutResssss.data",res.data)
//   return await res.data;
// });

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    //login
    statusOfLogin: "",
    loginRes: [],

    //logout
    logoutRes: "",
    statusOfLogout: "",
  },

  reducers: {
    changeLogoutState: (state, action) => {
      state.logoutRes = "not logout";
      //  state.userRole=action.payload
      //employee.role
      //  console.log("STORE",action.payload)
      //  state.name=state.name+1
      // state.userRole=action.payload
    },
  },
  extraReducers: {
    //login
    [postLogin.fulfilled]: (state, { payload }) => {
      state.statusOfLogin = "success";
      state.loginRes = payload;
    },
    [postLogin.pending]: (state) => {
      state.statusOfLogin = "pending";
    },
    [postLogin.rejected]: (state) => {
      state.statusOfLogin = "rejected";
    },
    //logout
    // [postLogout.fulfilled]: (state, { payload }) => {
    //   state.statusOfLogout = "success";
    //   state.logoutRes = payload;
    // },
    // [postLogout.pending]: (state) => {
    //   state.statusOfLogout = "pending";
    // },
    // [postLogout.rejected]: (state) => {
    //   state.statusOfLogout = "rejected";
    // },
  },
});

export const { changeLogoutState } = authSlice.actions;
export default authSlice.reducer;
