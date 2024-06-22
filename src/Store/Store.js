import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import channel_dataSlice from "./User_channel_data";
import AllStateSlice from "./AllStates.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    Channel_Data: channel_dataSlice,
    AllStates: AllStateSlice,
  },
});
