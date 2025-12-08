import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/NavBar'

const HomeLayout = () => {
  return (
   <div>
    <Navbar/>
    <Outlet/>
   </div>
  )
}

export default HomeLayout