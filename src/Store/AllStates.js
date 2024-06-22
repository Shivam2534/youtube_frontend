import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    SideBarToggle: false,
    VideoData: null
};

const AllStateSlice = createSlice({
  name: "AllStates",
  initialState,
  reducers: {
    OpenSideMenubar: (state, action) => {
      state.SideBarToggle = action.payload;
    },
    PushData: (state, action) => {
      state.VideoData = action.payload;
    },
  },
});


export const { OpenSideMenubar, PushData } = AllStateSlice.actions;
export default AllStateSlice.reducer;
