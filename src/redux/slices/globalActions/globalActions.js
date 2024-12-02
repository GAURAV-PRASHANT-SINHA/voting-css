import { createAsyncThunk } from "@reduxjs/toolkit";

// Reset error action
export const resetErrAction = createAsyncThunk("resetErr-Action", () => {
  return -1;
});

// Reset success action
export const resetSuccessAction = createAsyncThunk("resetSuccess-Action", () => {
  return {};
});
