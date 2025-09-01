

import React from 'react'
import './header.css'
import logo from "../assets/logo1.png"


function Navbar({onCreateJobClick}) {
  return (
   <div className='Header'>
    <div className='navbar'>
        <img id='logo' src={logo}/>
        <ul>
            <li >Home</li>
            <li >Find Jobs</li>
            <li >Find Talents</li>
            <li>About us</li>
            <li >Testimonials</li>
        </ul>
       <div className='button-container'> <button className='btn' onClick={onCreateJobClick}>Create Jobs</button></div>

    </div>
      </div>
     
  )
}

export default Navbar
