import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorMessageState {
  message: string | null;
}

const initialState: ErrorMessageState = {
  message: null,
};

const ErrorMessage = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    setErrorMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    clearErrorMessage(state) {
      state.message = null;
    },
  },
});

export const { setErrorMessage, clearErrorMessage } = ErrorMessage.actions;

export default ErrorMessage.reducer;
