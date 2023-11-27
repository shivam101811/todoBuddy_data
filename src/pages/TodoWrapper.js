import React from 'react';
import Todo from './Todo';
import  Navbar  from './Navbar';
import { useState } from 'react';
import { useSelector } from 'react-redux';


function TodoWrapper() {
    const [searchText, setSearch] = useState('');
   const {toggle} = useSelector((state)=> state.dashboard)
  






  return (
    
    <>
         <Navbar setSearch={setSearch}/>
         <Todo searchText={searchText}/>
    </>
  )
}

export default TodoWrapper