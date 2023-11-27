import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { clearStorage, getToken, getUserName, getUserRole, removeToken } from '../helper/token.helper';
import { useNavigate } from 'react-router-dom';
import Toast from "../common/Toast";
import Dropdown from 'react-bootstrap/Dropdown';
import "./layout.css"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setClickedOnHam, setToggle } from '../store/slice/dashboardSlice';




const Header = ({setSideBarToggle, sideBarToggle,}) => {
  const dispatch = useDispatch();
  const {toggle,clickedOnHam} = useSelector((state)=>state.dashboard)
  const [profile, setprofile] = useState(false);
  const navigate = useNavigate();
  const userName = getUserName();
  // console.log(userName, "this is username")
  const {isActiveTab} = useSelector((state)=> state.header);//from store.js
  // console.log(isActiveTab);




  const clickMe = () => {
    dispatch(setToggle(!toggle));

    toggle ? toast.success("Dark Mode Successfully!") :  toast.success("Light Mode Successfully!");
  }

  const LogOut = () => {
    Toast(false, "Logout successfully");
    clearStorage();
    removeToken();
    navigate("/login")
  }


  const handleSideBarToggle = () => {
    setSideBarToggle(!sideBarToggle);
    dispatch(setClickedOnHam(!clickedOnHam));
    // console.log(dispatch(setClickedOnHam(!clickedOnHam)),"this is clicked sidebar ========>")
  }


     

  return (
    <>
      <header id="page-topbar"  >
        <div className="navbar-header">
          <div className="d-flex">
          <div  className="heading-width pr-2" >
              <Link href="#" className="logo logo-dark" >
              
                {isActiveTab}
              </Link>
           
            </div>
            <button type="button" onClick={handleSideBarToggle} className="btn btn-sm  font-size-16 header-item waves-effect" id="vertical-menu-btn">
              <i className="fa fa-fw fa-bars"></i>
            </button>
          </div>

          <div className={`form-check form-switch  text-black`}>
            
            <input  className="form-check-input" type="checkbox" onChange={clickMe} id="flexSwitchCheckDefault"/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{toggle ?'Enable Dark Mode':'Enable Light Mode'}</label>
        </div>

{getToken()? (<Dropdown>
            <Dropdown.Toggle variant="transparent" className='border-0 d-flex align-items-center justify-content-center' id="dropdown-basic">
              <span className="d-none d-xl-inline-block" key="t-henry">Hi {userName}</span>
              {/* <i className="mdi mdi-chevron-down  d-none d-xl-inline-block"  id="dropdown-basic"></i> */}
              <span className='rounded-circle ms-2 fs-20'><i className='bx bxs-user-circle ' style={{
                fontSize: '27px',
                background: 'transparent !important'
              }}></i></span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={LogOut}><i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>) : <Link to="/login" className={`btn mb-3 btn-dark`}>Login?</Link> 
          }
          
        </div>
      </header>
    </>
  )
}

export default Header;



