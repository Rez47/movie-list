import { createSlice } from "@reduxjs/toolkit";

interface User {
  uid: string;
  email: string;
}

interface UserState {
  currentUser: User;
}

const initialState: UserState = {
  currentUser: {
    uid: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = {
        uid: "",
        email: "",
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
