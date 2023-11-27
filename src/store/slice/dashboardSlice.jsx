// dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  progress: 0,

  toggle: false,

  chartData: [0, 0, 0],
  clickedOnHam:false


};


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    setClickedOnHam : (state, action) =>{
      state.clickedOnHam = action.payload;
    }
  },
});

export const { setProgress, setToggle, setChartData ,setClickedOnHam } = dashboardSlice.actions;

export default dashboardSlice.reducer;
