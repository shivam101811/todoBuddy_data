import React from 'react';
import {  NavLink } from 'react-router-dom';
import { sideBarData } from '../helper/sideBarData';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../store/slice/headerSlice';



const Sidebar = () => {
    const dispatch = useDispatch()
const {clickedOnHam} = useSelector((state)=> state.dashboard)
    const handleTabChange=(data)=>{
        dispatch(setActiveTab(data))
    }

    return (
        <>
            <div className='vertical-menu' style={{display:`${clickedOnHam ? "block" : ""}`}}>
                <div data-simplebar className="h-100">
                    <div id="sidebar-menu">
                        <ul className="metismenu list-unstyled" id="side-menu">
                             {sideBarData?.map((item)=>{
                                return (
                                    <li key={item.name.toString()} onClick={()=>handleTabChange(item.name)}>
                                    <NavLink to={item.path} className="has-arrow waves-effect">
                                        <i className={item.icon}></i>
                                        <span className='d-inline' >{item.name}</span>
                                    </NavLink>
                                </li>
                                )
                             })}
                            {/* <li className="menu-title mt-5" key="t-menu">Menu</li> */}
                        </ul>
                    </div>
                </div>
            </div>
      

        </>
    )
}

export default Sidebar