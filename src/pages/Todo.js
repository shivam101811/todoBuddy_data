import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./pages.css";
import img1 from '../Assets/no-data.gif';
import Loader from '../common/Loader';
import { getToken } from '../helper/token.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faTableList } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setProgress, setChartData } from '../store/slice/dashboardSlice';
import { setEditToggle, setMiniLoader, setLoader, setEditTodoData, setRowIndex, setInputCursor, setCurrentPage, setInputchange, setView, setTodoData, todoDetails, deleteTodoItem, marksTodoAsDone, markTodoAsDoneItem, editTodoItem, addedTodo } from "../store/slice/todoSlice"



function Todo({ searchText }) {
    const url = "https://todobuddyy.onrender.com/todos";


    const dispatch = useDispatch();//redux
    const { progress, toggle, clickedOnHam } = useSelector((state) => state.dashboard)
    const { todoData, editToggle, miniloader, loader, editTodoData, rowIndex, inputCursor, todosperPage, currentPage, inputchange, view } = useSelector((state) => state.todo)

    const [initialTodo, setInitialTodo] = useState({
        name: '',
        status: "Pending",
        createdAt: new Date().toDateString(),
        editCount: 0,
        userId: getToken()

    });


    const inputRef = useRef(null);
    const indexOfLastTodo = currentPage * todosperPage
    const indexOfFirstTodo = indexOfLastTodo - todosperPage;
    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addedTodo(initialTodo)).then(()=>{
            toast.success(`${initialTodo.name}, is added Successfully`)
        }).catch((err)=>{
            console.log(err)
        })


    };

    const filteredTodos = todoData
    .filter((item) =>
      inputchange === 'All' ||
      item.status === inputchange ||
      (inputchange === 'Edited' && item.editCount > 0)
    )
    .filter((item) => item?.name?.toLowerCase().includes(searchText))
    .filter((item) => {
      const userToken = getToken();
      return item.userId === userToken; // Adjust the property accordingly
    });

    const pendingTask = filteredTodos.filter((e) => e.status === "Pending").length;
    const completeTask = filteredTodos.filter((e) => e.status === "Complete").length;
    const editedTask = filteredTodos.filter((e) => e.editCount > 0).length;
    const updatedChartData = [pendingTask, completeTask, editedTask]

    // dispatch(setChartData(updatedChartData)); dont uncomment  this line of code crash marega ******warning****** 




  


    // console.log("toddoData", filteredTodos);
    const visibleTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    const getTodoData = () => {
        dispatch(setInputCursor('no-drop'));
        dispatch(setMiniLoader(true));

        dispatch(todoDetails())
            .then((response) => {
                // console.log(response, "this is response")
                // console.log("shashank shama here ", response.payload.data);

                dispatch(setTodoData(response.payload.data));
                dispatch(setLoader(false));
                dispatch(setMiniLoader(false));
                dispatch(setInputCursor('pointer'));
            })
            .catch((err) => {
                console.log(err);
                dispatch(setLoader(false));
                dispatch(setMiniLoader(false));
                dispatch(setInputCursor('pointer'));
            });
    };

    const handleDelete = (itemId, name) => {
        dispatch(deleteTodoItem(itemId))
            .then(() => {
                toast.success(`${name}, is deleted successfully`);
                // No need to manually update the state here, as it will be handled by the deleteTodoItem fulfilled case.
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleMarkAsDone = (e, item) => {
        const { checked } = e.target;
        const { id } = item;

        dispatch(markTodoAsDoneItem({ todoId: id, status: checked ? "Complete" : "Pending" }))
            .then(() => {


            })
            .catch((err) => {
                console.log(err);
            });
    };



    const handleEditTodoSubmit = (item) => {
        const { id, editCount } = item;
      
        dispatch(editTodoItem({
          todoId: id,
          data: {
            name: editTodoData,
            createdAt: new Date().toDateString(),
            editCount: editCount + 1
          }
        }))
        .then(() => {
          dispatch(setEditToggle(false));
          // Optionally, you can dispatch other actions or update the local state here.
        })
        .catch((err) => console.log(err));
      };

      

const progressBar = () => {
  const userToken = getToken();

  // Filter todos based on the user's token
  const userTodos = todoData.filter((item) => item.userId === userToken);

  const totalTasks = userTodos.length;
//   console.log("totalTasks", totalTasks);

  const completedTasks = userTodos.filter((e) => e.status === "Complete").length;

  const calculatedProgress = (completedTasks / totalTasks) * 100;

  // Dispatch the progress to Redux store
  dispatch(setProgress(calculatedProgress));
};



const numberOfTotalPages = Math.ceil(filteredTodos.length / todosperPage)
    const pages = [...Array(numberOfTotalPages + 1).keys()].slice(1);

const nextPageHandler = () => {
    if (currentPage !== numberOfTotalPages) dispatch(setCurrentPage(currentPage + 1))
}

const prevPageHandler = () => {
    if (currentPage !== 1) dispatch(setCurrentPage(currentPage - 1))
}




    useEffect(() => {
        progressBar();
        dispatch(setChartData(updatedChartData));
    }, [todoData]);

    useEffect(() => {
        getTodoData();
    }, [])




    const toggleView = () => {
        dispatch(setView(!view));
    }

    return (
        <>
            <div className="main-content">
                <div  style={{ position: "relative", minHeight: "80vh", marginLeft:`${clickedOnHam ? "70px" : ""}` }}>
                    {
                        loader === true ? <Loader /> :
                            (
                                <div className="container-fluid">
                                    {/* <!-- start page title --> */}
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                                {/* <h4 className="mb-sm-0 font-size-18">Todo</h4> */}

                                                <div className="container mt-3">
                                                    <button onClick={toggleView} className={`btn mb-3 btn-${toggle ? "dark" : "primary"}`}><FontAwesomeIcon icon={view ? faTableList : faClipboard} className="mr-2" />  {view ? "Table View ?" : "Card View?"}</button>
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <form onSubmit={handleSubmit}>
                                                                <div className="input-group mb-3">
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        placeholder="Enter todo..."
                                                                        onChange={(e) => setInitialTodo({ ...initialTodo, name: e.target.value })}
                                                                        ref={inputRef}

                                                                    />
                                                                    <button className="btn btn-dark" type='submit' >Add</button>
                                                                </div>
                                                            </form>

                                                        </div>
                                                        <div className="col-md-7">
                                                            <div className="input-group mb-3">
                                                                <select
                                                                    onInput={(e) => dispatch(setInputchange(e.target.value))}
                                                                    className="form-select me-2"
                                                                    aria-label="Default select example"
                                                                >
                                                                    <option defaultValue="All">All</option>
                                                                    <option>Pending</option>
                                                                    <option>Complete</option>
                                                                    <option>Edited</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className={`d-flex justify-content-center mt-3 mr-3 text-${toggle ? 'black' : 'light'}`} style={{  alignItems: 'center', gap: "10px", borderRadius: "13px" }}>
                                                        <div style={{
                                                            width: '100%',
                                                            height: '20px',
                                                            backgroundColor: '#557295',
                                                            boxShadow: toggle ? 'box-shadow: rgb(126 159 211 / 70%) -2px 2px 14px 6px;' : 'rgb(9 113 217 / 70%) 0px 0px 10px 4px',
                                                        }}>
                                                            {miniloader ? (
                                                                <div style={{ textAlign: 'center', lineHeight: '20px', color: 'white' }}>
                                                                    Loading...
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    style={{
                                                                        width: `${Math.round(progress)}%`,
                                                                        height: '100%',
                                                                        backgroundColor: toggle ? '#212529' : 'white',
                                                                        color: toggle ? 'white' : 'black',
                                                                        textAlign: 'center',
                                                                        lineHeight: '20px',
                                                                        transition: '0.4s',
                                                                    }}
                                                                >
                                                                    {`${Math.round(progress)}%`}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {visibleTodos.length === 0 ? (
                                                        <div className="text-center">
                                                            <img src={img1} alt="No Data Found"  className='no-data-img' />
                                                            <p className={`text-${toggle ? "dark" : "light"}`}> NO TODO FOUND....</p>
                                                        </div>
                                                    ) : (
                                                        view ? (
                                                            // <<<<<================CardView================>>>>
                                                            <div className="todo-container mt-3">
                                                                {visibleTodos && visibleTodos.map((item, index) => (
                                                                    <div className={`width-box mb-3 todo-row bg-${toggle ? "light" : "dark"} text-black`} key={item.id}>
                                                                        {console.log(toggle, "this is toggle ")}
                                                                        <div className={`bg-box card ${item.status === "Complete" ? 'border-success' : 'border-warning'}`} >
                                                                            <div className="bg-box card-body">
                                                                                <h5 className="card-title">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        defaultChecked={item.status === "Complete"}
                                                                                        onChange={(e) => handleMarkAsDone(e, item)}
                                                                                        style={{ cursor: inputCursor }}
                                                                                    />
                                                                                </h5>
                                                                                <p className="card-text" style={{ textDecoration: item.status === "Complete" ? 'line-through' : 'none' }}>
                                                                                    {editToggle && rowIndex === index ?
                                                                                        <input defaultValue={item.name} onChange={(e) => dispatch(setEditTodoData(e.target.value))} />
                                                                                        :
                                                                                        item.name
                                                                                    }
                                                                                </p>
                                                                                <p className={`card-text ${item.status === "Pending" ? 'text-warning' : 'text-success'}`}>{item.status}</p>
                                                                                <p className="card-text">{item.createdAt}</p>
                                                                                <div>
                                                                                    {editToggle && rowIndex === index ?
                                                                                        <>
                                                                                            <button className="btn btn-sm btn-danger" onClick={() => dispatch(setEditToggle(false))}>Cancel</button>
                                                                                            <button className="btn btn-sm btn-success ms-2" onClick={() => handleEditTodoSubmit(item)}>Save</button>
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            <button className="btn btn-sm btn-success" disabled={item.editCount === 2} onClick={() => { dispatch(setEditToggle(true)); dispatch(setRowIndex(index)) }}>Edit</button>
                                                                                            <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(item.id, item.name)}>Delete</button>
                                                                                        </>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (

                                                            // <<<<<==============TableView=================>>>>
                                                            <div className="table-responsive bg-light mt-4" >
                                                                <table className="table caption-top">
                                                                    <caption className='mx-2'>List of todos</caption>
                                                                    <thead className="table-dark">
                                                                        <tr>
                                                                            <th scope="col">Id</th>
                                                                            <th scope="col">Mark As Done</th>
                                                                            <th scope="col">Name</th>
                                                                            <th scope="col">Status</th>
                                                                            <th scope="col">Created At</th>
                                                                            <th scope="col">Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            visibleTodos && visibleTodos.filter((item) =>
                                                                                inputchange === 'All'
                                                                                ||
                                                                                item.status === inputchange ||
                                                                                inputchange === 'Edited' && item.editCount > 0
                                                                            ).filter((item) => item?.name?.toLowerCase().includes(searchText)).map((item, index) => (
                                                                                <tr key={item.id}>
                                                                                    <th scope="row">{item.id}</th>
                                                                                    <td>

                                                                                        <input
                                                                                            type="checkbox"
                                                                                            defaultChecked={item.status === "Complete"} onChange={(e) => handleMarkAsDone(e, item)}
                                                                                        />
                                                                                    </td>
                                                                                    <td>{editToggle && rowIndex === index ? <input defaultValue={item.name} onChange={(e) => dispatch(setEditTodoData(e.target.value))} /> : item.name}</td>
                                                                                    <td className={item.status === "Pending" ? 'text-warning' : "text-success"}>{item.status}</td>
                                                                                    <td>{item.createdAt}</td>
                                                                                    <td>{
                                                                                        editToggle && rowIndex === index ? <><button className="btn btn-sm btn-danger" onClick={() => dispatch(setEditToggle(false))}>Cancel</button>
                                                                                            <button className="btn btn-sm btn-success ms-2" onClick={() => handleEditTodoSubmit(item)}>Save</button></>
                                                                                            :

                                                                                            <>
                                                                                                <button className="btn btn-sm btn-success" disabled={item.editCount === 2} onClick={() => { dispatch(setEditToggle(true)); dispatch(setRowIndex(index)) }}>Edit</button>
                                                                                                <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(item.id)}>Delete</button>
                                                                                            </>
                                                                                    }

                                                                                    </td>
                                                                                </tr>
                                                                            ))}

                                                                    </tbody>
                                                                </table>


                                                            </div>)

                                                    )}
                                                    <div className={`d-flex justify-content-center align-items-center m-3 mb-5 ${toggle ? 'text-dark' : 'text-light'}`}>
                                                        <span className={"m-2 "} style={{ cursor: "pointer" }} onClick={prevPageHandler}> Prev </span>
                                                        {pages.map((p) => (
                                                            <span
                                                                key={p}
                                                                style={{ cursor: "pointer", fontSize: "20px" }}
                                                                className={`${currentPage === p && 'active'}`}
                                                                onClick={(e) => dispatch(setCurrentPage(p))}
                                                            >{`| ${p} |`}</span>
                                                        ))}
                                                        <span className={"m-2 "} style={{ cursor: "pointer" }} onClick={nextPageHandler}> Next </span>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>)}
                    {/* <!-- container-fluid --> */}
                </div>

            </div>
        </>



    );
}

export default Todo;
