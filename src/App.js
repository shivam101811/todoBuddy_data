import React, { Fragment, useEffect } from 'react'
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wrapper from './layouts/Wrapper';
import { ToastContainer } from 'react-toastify';
// Toaster css 
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Register from './pages/Register';
// Login module routes check over here
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
const {toggle}= useSelector((state)=> state.dashboard)
  
  if(toggle=== false){  
    document.body.style.backgroundColor = '#161827 ';
 }else{
   document.body.style.backgroundColor = '#75ebb6 ';
 }

  useEffect(() => { 
    // checking while component is being mounted weather it is auth check or not
    if (location.pathname === "" || location.pathname === "/" || location.pathname === "/todoBuddy") {
      navigate("/login");
    } 
   
  }, []);

  const gotoLogin = () => {
    return (
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    );
  };



  return (
    <Fragment>
       <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
      {
        location.pathname === "" ||
          location.pathname === "/login" ||
          location.pathname === "/register" ||
          location.pathname === "/" ? (
          gotoLogin()
        ) :
          <Wrapper/>
      }
    </Fragment>
  );
}

export default App