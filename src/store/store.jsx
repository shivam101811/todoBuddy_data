import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./slice/headerSlice"
import todoReducer from "./slice/todoSlice"
import dashboardReducer from "./slice/dashboardSlice"




const rootReducer = combineReducers({
   header : headerReducer,
   todo : todoReducer,
   dashboard: dashboardReducer
});

// export default createStore(rootReducer);
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
