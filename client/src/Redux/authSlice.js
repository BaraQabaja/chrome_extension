import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//login api  handlig
export const postLogin = createAsyncThunk("login/postLogin", async (data) => {

 
  const res = await axios.post("http://127.0.0.1:5000/api/login", {
    email: data.email,
    password: data.password,
  });

  return await res.data;
});



//logout api  handlig
export const postLogout = createAsyncThunk("logout/postLogout", async () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  }
  const res = await axios.post("http://127.0.0.1:5000/api/logout","something",config);
  return await res.data;
});

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

    },
  },
  extraReducers: {
    //login api (request) status tracing
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
    //logout api (request) status tracing
    [postLogout.fulfilled]: (state, { payload }) => {
      state.statusOfLogout = "success";
      state.logoutRes = payload;
    },
    [postLogout.pending]: (state) => {
      state.statusOfLogout = "pending";
    },
    [postLogout.rejected]: (state) => {
      state.statusOfLogout = "rejected";
    },

   
  },
});

export const { changeLogoutState } = authSlice.actions;
export default authSlice.reducer;
