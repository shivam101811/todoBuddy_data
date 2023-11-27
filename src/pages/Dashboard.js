import React from 'react'
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import TodoChart from '../graph/TodoChart';
import Pie from '../graph/Pie';
import { useEffect } from 'react';
import { setTodoData, todoDetails ,setLoader } from '../store/slice/todoSlice';
import { getToken } from '../helper/token.helper';
import { setChartData, setProgress  } from '../store/slice/dashboardSlice';
import Loader from '../common/Loader';


const Dashboard = () => {
    const dispatch = useDispatch()
    const { todoData, loader} = useSelector((state)=>state.todo)

    // console.log("state in dashboard ====> " , todoState);
    const { progress, toggle, chartData ,clickedOnHam } = useSelector((state) => state.dashboard)


    const isMobile = window.innerWidth <= 500;

    const containerStyles = {
        width: isMobile ? 100 : 150,
        height: isMobile ? 100 : 150,
    };


    const getMessageForProgress = (progress) => {
        if (progress <= 20) {
            return "You need to work harder!";
        } else if (progress <= 50) {
            return "Keep going, you're making progress!";
        } else if (progress <= 80) {
            return "Great job! Almost there.";
        } else if (progress < 100) {
            return "You're almost done! Keep pushing.";
        } else {
            return "Congratulations! Task completed!";
        }
    };

   const  getTodoData = () => {
    dispatch(setLoader(true));
    dispatch(todoDetails()).then((res)=>{
        dispatch(setTodoData(res.payload.data))
        dispatch(setLoader(false));
    }).catch((err)=>{
        console.log(err);
        dispatch(setLoader(false));
    })
   }

// console.log(todoData, "==========> this is tododata")

const userData = todoData.filter((user)=>{
const  userToken =  getToken();
// console.log(userToken, "=========> user token")
return user.userId === userToken })

// console.log(userData, "=========> this is userdata")

const pendingTask = userData.filter((e) => e.status === "Pending").length;
const completeTask = userData.filter((e) => e.status === "Complete").length;
const editedTask = userData.filter((e) => e.editCount > 0).length;
const updatedChartData = [pendingTask, completeTask, editedTask] 
// console.log(updatedChartData, "=======> updatedchartdata")
const totalTasks = userData.length;
// const completedTasks = userTodos.filter((e) => e.status === "Complete").length;

const calculatedProgress = (completeTask / totalTasks) * 100;


   useEffect(() => {
    // progressBar();
    dispatch(setChartData(updatedChartData));
    dispatch((setProgress(calculatedProgress) ))
}, [todoData]);

    useEffect(()=>{ 
        getTodoData()
    },[])
    

    return (
        <div className="main-content">



<div className="page-content" style={{marginLeft:`${clickedOnHam ? "70px" : ""}`,position:"relative", minHeight:"100vh"}}>
{loader === true ? <Loader /> :
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className={`mb-sm-0 font-size-18 text-${toggle ? "dark" : "light"}`}>{getToken() ? "Dashboard": "Kindly Login First !"} </h4>
                            </div>
                        </div>
                    </div>


                    <div className='row text-center mt-2'>
                        <h4 className={`text-${toggle ? 'dark' : 'light'}`}>Performance Graph</h4>
                    </div>
                    {/* <!-- end row --> */}
                    {/* <!-- end row --> */}


                    <div className={`d-flex justify-content-center m-4 mt-6 text-${toggle ? 'black' : 'light'}`} style={{ marginRight: '56px', alignItems: 'center', gap: "10px" }}>
                        <div style={containerStyles} >
                            <CircularProgressbar
                                value={Math.round(progress)}
                                text={`${Math.round(progress)}%`}
                                styles={buildStyles({
                                    textColor: `${toggle ? 'black' : 'white'}`,
                                    pathColor: `${toggle ? '#212529' : '#12ff00'}`,
                                    trailColor: "#557295",
                                })}
                            />
                        </div>

                        <p className={`ml-4 mb-0`}>
                            {Math.round(progress)}% Tasks Completed - {getMessageForProgress(Math.round(progress))}
                        </p>
                    </div>


                    <TodoChart data={chartData} />
                    <div className="d-flex justify-content-center my-5"><Pie series={chartData} /> </div>


                </div> }
                {/* <!-- container-fluid --> */}
            </div>




            


        </div>
    )
}

export default Dashboard;