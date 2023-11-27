import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {

  const {isActiveTab} = useSelector((state)=>state.header)
  const date = new Date().getFullYear()
  return (
    <footer className="footer">
    <div className="container-fluid">
    <div className="row ">

            <div className="text-end">
            Crafted with passion by Shivam Sharma.
            </div>
            
        </div>
    </div>
</footer>
  )
}

export default Footer;