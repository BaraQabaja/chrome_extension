import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//get user info  (api handlig)
export const getPersonalInformation = createAsyncThunk(
  "perosnalInfo/getPersonalInfo",
  async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.get(
      "http://127.0.0.1:5000/api/user/get_personal_informaion",
      config
    );
    console.log("userInfo", res);
    return await res.data;
  }
);
//update username (api handlig)

export const putEditUsername = createAsyncThunk(
  "editUsername/putEditUsername",
  async (data) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.put(
      "http://127.0.0.1:5000/api/user/updateUsername",
      {
        newUsername: data.newUsername,
      },
      config
    );
    console.log("update username", res.data);
    return await res.data;
  }
);

//create new user (api handlig)
export const postCreateUser = createAsyncThunk(
  "createUser/postCreateUser",
  async (data) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.post(
      "http://127.0.0.1:5000/api/user/create_user",
      {
        email: data.createEmail,
        username: data.createUsername,
        password: data.createPassword,
      },
      config
    );
    console.log(res);
    return await res;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,

    //profile info data
    personalInfo: {},
    statusOfFetchingPersonal: "",

    //update username response parameters
    updateUsernameRes: "",
    updateUsernamestatus: "",

    // create user res parms
    createUserResponse: "",
    statusOfFetchingForCreateUser: "",
  },

  reducers: {
   
  },
  extraReducers: {
    //profile info request status tracing
    [getPersonalInformation.fulfilled]: (state, { payload }) => {
      state.statusOfFetchingPersonal = "success";
      state.personalInfo = payload;
    },
    [getPersonalInformation.pending]: (state) => {
      state.statusOfFetchingPersonal = "pending";
    },
    [getPersonalInformation.rejected]: (state) => {
      state.statusOfFetchingPersonal = "rejected";
    },

    //update usernaem request status tracing
    [putEditUsername.fulfilled]: (state, { payload }) => {
      state.updateUsernamestatus = "success";
      state.updateUsernameRes = payload;
    },
    [putEditUsername.pending]: (state) => {
      state.updateUsernamestatus = "pending";
    },
    [putEditUsername.rejected]: (state) => {
      state.updateUsernamestatus = "rejected";
    },

    //create user request status tracing
    [postCreateUser.fulfilled]: (state, { payload }) => {
      state.statusOfFetchingForCreateUser = "success";
      state.createUserResponse = payload;
    },
    [postCreateUser.pending]: (state) => {
      state.statusOfFetchingForCreateUser = "pending";
    },
    [postCreateUser.rejected]: (state) => {
      state.statusOfFetchingForCreateUser = "rejected";
    },
  },
});

export default userSlice.reducer;
