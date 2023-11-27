import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTodo, editTodo, fetchTodoDatafromServer ,markTodoAsDone,addTodo } from "../../services/services";



const initialState = {
  status : null,
  todo: null,
  todoData: [],
  editToggle: false,
  miniloader: true,
  loader: true,
  editTodoData: '',
  rowIndex: null,
  inputCursor: "pointer",
  todosperPage: 6,
  currentPage: 1,
  inputchange: 'All',
  view: "true"

}
export const todoDetails = createAsyncThunk('todo/todoDetails', async (_, { getState, dispatch }) => {
  // API call over here 

  // console.log("reaching async thunk  =====> ");
  const response = await fetchTodoDatafromServer().then((res) => {
    // console.log(res);
    // console.log("reaching async thunk then block   =====> " , res);
    return {
      data : res.data
    }
 
  }).catch((err) => {
    console.log(err);
  })

  return response
})


export const deleteTodoItem = createAsyncThunk('todo/deleteTodoItem', async (itemId, { getState, dispatch }) => {
  try {
    await deleteTodo(itemId);  
    const response = await fetchTodoDatafromServer();
    return response.data;
  } catch (error) {
    console.log("Error deleting todo:", error);
    // throw error; 
  }
});
export const addedTodo = createAsyncThunk('todo/addedTodo' , async(data , {getState, dispatch}) => {
  try{
    await addTodo(data);
  const response    = await fetchTodoDatafromServer();
  return response.data;
  } catch(error){
    console.error("Error marking todo as done :", error);
    throw error
  }


})


export const markTodoAsDoneItem = createAsyncThunk('todo/markTodoAsDoneItem', async ({ todoId, status }, { getState, dispatch }) => {
  try {
    await markTodoAsDone(todoId, status);
    const response = await fetchTodoDatafromServer();
    return response.data;
  } catch (error) {
    console.error("Error marking todo as done:", error);
    throw error;
  }
});

export const editTodoItem = createAsyncThunk('todo/editTodoItem', async ({ todoId, data }, { getState, dispatch }) => {
  try {
    await editTodo(todoId, data);
    const response = await fetchTodoDatafromServer();
    return response.data;
  } catch (error) {
    console.error("Error editing todo:", error);
    throw error;
  }
});


const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    settodo: (state, action) => {
      state.todo = action.payload;
    },
    setTodoData: (state, action) => {
      state.todoData = action.payload;
    },
    setEditToggle: (state, action) => {
      state.editToggle = action.payload;
    },
    setMiniLoader: (state, action) => {
      state.miniloader = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setEditTodoData: (state, action) => {
      state.editTodoData = action.payload;
    }
    , setRowIndex: (state, action) => {
      state.rowIndex = action.payload;
    }
    , setInputCursor: (state, action) => {
      state.inputCursor = action.payload
    }, setTodosPages: (state, action) => {
      state.todosperPage = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setInputchange: (state, action) => {
      state.inputchange = action.payload
    },
    setView: (state, action) => {
      state.view = action.payload
    }
  },
  extraReducers: {
    [todoDetails.fulfilled]: (state, action) => {

      state.todoData = action.payload.data
    },
    [todoDetails.rejected]: (state, _) => {
      
      
      state.todo = []
    },
    [todoDetails.pending]: (state, _) => {
      

      state.todo = []
    }, 
    [deleteTodoItem.fulfilled]: (state, action) => {

      
      state.todoData = action.payload;
    },
    [deleteTodoItem.rejected]: (state, _) => {
      

    },
    [deleteTodoItem.pending]: (state, _) => {

    },
    [markTodoAsDoneItem.fulfilled]: (state, action) => {
      state.inputCursor= "pointer"
      state.miniloader = false
      state.todoData = action.payload;
    
    },
    [markTodoAsDoneItem.rejected]: (state, _) => {

    },
    [markTodoAsDoneItem.pending]: (state, _) => {
      state.miniloader = true;
      state.inputCursor= "no-drop"

    },
    [editTodoItem.fulfilled]: (state, action) => {
      
      state.todoData = action.payload;
    },
    [editTodoItem.rejected]: (state, _) => {
      
    },
    [editTodoItem.pending]: (state, _) => {
      
    },
    [addedTodo.fulfilled]: (state, action)=>{
      state.todoData =action.payload
    },
    [addedTodo.rejected]: (state, action)=>{
      
    },
    [addedTodo.pending]: (state, action)=>{
      
    }
  },
});





export const { setEditToggle, setMiniLoader, setLoader, setEditTodoData, setRowIndex, setInputCursor, setTodosPages, setCurrentPage, setInputchange, setView, setTodoData } = todoSlice.actions

export default todoSlice.reducer