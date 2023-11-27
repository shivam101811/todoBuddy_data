import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setTermsAndCondition, setToken, setUserName, setUserRole } from "../helper/token.helper";
import Toast from "../common/Toast";
import { login, terms_Condition } from "../services/services";
import { Button, Modal } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./pages.css";
const Login = () => {
    const {toggle} = useSelector((state)=> state.dashboard)

    const [users, setUsers] = useState([])





    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [preview, setpreview] = useState(false);
    const [credentials, setCredentials] = useState({
        username: null,
        password: null
    });




    const navigate = useNavigate();
    const handleSubmit = () => {
        if (!credentials.username) {
            Toast(true, 'please enter username')
        } else if (!credentials.password) {
            Toast(true, 'Please enter password');
        } else if (credentials.username && credentials.password) {
            const { username, password } = credentials
            const isValid = users.filter((item) => item.username === username && item.password === password)
            
            if (isValid.length === 0) Toast(true, "Invalid credentials ")
            else {
                setToken(isValid[0].id)
                setUserName(isValid[0].username)
                Toast(false, ` ${isValid[0].username} Logged in successfully`)
                navigate('/dashboard');

            }
        }
    }






    const getAllUsers = () => {
        try {
            login().then((res) => {
                console.log(res);
                setUsers(res.data)
            }).catch((err) => {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <div>
            {/* {console.log(credentials)} */}
            <div className="container-fluid p-0">
                <div className="row g-0 overflow-hidden">
                    <div className="col-xl-9">
                        <div className="auth-full-bg pt-lg-5 p-4">
                            <div className="w-100 ">
                                <div className="bg-overlay"></div>
                                <div className="Heading d-flex h-100 justify-content-center align-items-center flex-column" style={{fontSize:"100px", color:"black"}}>

                                TodoBuddy
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className="auth-full-page-content p-md-5 p-4">
                            <div className="w-100">
                                <div className="d-flex flex-column h-100">
                                    <div className="mb-4 mb-md-5">
                                        <Link to="/dashboard" className="todoLogo">
                                            TODOBUDDY
                                        </Link>
                                    </div>
                                    <div className="my-auto">

                                        <div>
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className={` text-${toggle? "dark": "light"}`}>Sign in to continue to TodoBuddy.</p>
                                        </div>

                                        <div className="mt-4">
                                            <form onSubmit={handleSubmit}>

                                                <div className="mb-3">
                                                    <label for="username" className={` text-${toggle? "dark": "light"}`}>Username</label>
                                                    <input type="text" className="form-control" id="username" placeholder="Enter username" value={credentials?.username} onChange={(event) => setCredentials((prev) => ({ ...prev, username: event.target.value }))} />
                                                </div>

                                                <div className="mb-3">
                                                    
                                                    <label className={` text-${toggle? "dark": "light"}`}>Password</label>
                                                    <div className="input-group auth-pass-inputgroup">
                                                        <input type={preview ? "text" : "password"} className="form-control" placeholder="Enter password" aria-label="Password" value={credentials?.password} onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))} aria-describedby="password-addon" />
                                                        <button className="btn btn-light " type="button" id="password-addon" onClick={() => setpreview(!preview)}><i className="mdi mdi-eye-outline"></i></button>
                                                    </div>
                                                </div>

                                                

                                                <div className="mt-3 d-grid">
                                                    <button className="btn btn-primary waves-effect waves-light"   type="submit">Log In</button>
                                                </div>

                                              
                                                <div className="mt-4 d-grid">
                                                    <Link to="/register" className="btn btn-primary waves-effect waves-light"   >Register ?</Link>
                                                </div> 

                                                

                                                <p className="login-effect">TodoBuddy: Where Your Tasks Shine Brighter Than Ever!</p>



                                            </form>

                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    )
};
export default Login;


