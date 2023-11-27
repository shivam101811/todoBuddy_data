import axios from "axios";
import { getToken } from "../helper/token.helper";
let backendapi = 'https://todobuddyy.onrender.com';
const config = {
  headers: {
    'Authorization': `Bearer ${getToken()}`,
  }
};



 const login = async () => {
  return await axios.get(`${backendapi}/user`);
};



// Todo Api's --------------------------->


// get api 

const fetchTodoDatafromServer=()=>{
  return axios.get(`${backendapi}/todos`)
}
const addTodo =(data)=>{
  return axios.post(`${backendapi}/todos` , data)
}

const deleteTodo =(todoId)=>{
  return axios.delete(`${backendapi}/todos/${todoId}`)
}

const markTodoAsDone =(todoId , status)=>{
  return axios.patch(`${backendapi}/todos/${todoId}`,{status})
}

const editTodo = (todoId, data) => {
  return axios.patch(`${backendapi}/todos/${todoId}`, data);
}
export {
  login ,
  fetchTodoDatafromServer,
  deleteTodo,
  markTodoAsDone,
  editTodo,
  addTodo
}

