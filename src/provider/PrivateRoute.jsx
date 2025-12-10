import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router'

const PrivateRoute = ({children}) => {
    const { user,loading } = useContext(AuthContext)

    const location = useLocation()

      if (loading) {
    return <div className='flex justify-center items-center  w-full h-screen'><span className="loading mx-auto  w-10 h-10 loading-spinner text-secondary"></span></div>;
  }

    if (user) {
        return children
    }

    return <Navigate state={location.pathname}  to="/auth/login" />;

}

export default PrivateRoute