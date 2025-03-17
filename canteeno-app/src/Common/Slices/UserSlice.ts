import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  token: string;
  password?: string;
}

const initialState: UserState = {
  userId: 0,
  name: "",
  email: "",
  phoneNumber: "",
  role: "",
  token: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserState>) {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.password = action.payload.password;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
