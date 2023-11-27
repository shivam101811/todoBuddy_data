import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActiveTab: "Dashboard",
 
};



const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.isActiveTab = action.payload
            // console.log(state ,"inside action " , action.payload);
    },
  },
});

export const {
  setActiveTab

} = headerSlice.actions;

export default headerSlice.reducer;
