import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'

const HomeLayout = () => {
  return (
   <div>
    <Navbar/>
    <Outlet/>
    <Footer/>
   </div>
  )
}

export default HomeLayout