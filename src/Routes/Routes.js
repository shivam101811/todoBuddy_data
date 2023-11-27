import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../common/Loader";
import loadable from "@loadable/component";
import TodoWrapper from "../pages/TodoWrapper";
import Dashboard from "../pages/Dashboard";




// const Dashboard = loadable(() => import("../pages/Dashboard"), {
//   fallback: <Loader />,
// });


const Nopage = loadable(() => import("./error"), {
  fallback: <Loader />,
});

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard"  element={<Dashboard/>} />
        <Route path="/todo" element={<TodoWrapper/>} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </>
  )
};
export default PrivateRoutes;