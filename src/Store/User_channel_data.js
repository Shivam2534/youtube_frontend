import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  QueryData: null,
};

const channel_dataSlice = createSlice({
  name: "Channel_Data",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.QueryData = action.payload;
    },
    DeleteSearchQuery: (state, action) => {
      state.QueryData = null;
    },
  },
});

export const { setSearchQuery, DeleteSearchQuery } = channel_dataSlice.actions;
export default channel_dataSlice.reducer;
