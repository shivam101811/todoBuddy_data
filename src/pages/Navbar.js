import React from 'react'
import { toast } from 'react-toastify';
import { setToggle } from '../store/slice/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function ({ setSearch}) {

const {toggle} = useSelector((state)=>state.dashboard)
// console.log(toggle,"<===== this is toggle")





  return (
    <>
     <div className="main-content">


     <nav className={`navbar navbar-expand-lg ${toggle ? 'navbar-light bg-light': 'navbar-dark bg-dark' }  px-3 `}>
        {/* bg-dark */}
        <a className="navbar-brand" href="#">
            ToDo
        </a>
      
        <div className="navbar-collapse  d-flex  justify-content-between" id="navbarSupportedContent">
        <form className="form-inline my-2 my-lg-0 d-flex col-5">
            <input
                type="search"
                className="form-control mr-sm-2"
                placeholder="Search Todo..."
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </form>
            

         
         
        </div>
        </nav>
     </div>
      

    </>
  )
}
