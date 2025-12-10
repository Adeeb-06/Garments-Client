import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router'

const ApproveRoute = ({children}) => {
    const { userData,loading } = useContext(AuthContext)

    const location = useLocation()

      if (loading) {
    return <div className='flex justify-center items-center  w-full h-screen'><span className="loading mx-auto  w-10 h-10 loading-spinner text-secondary"></span></div>;
  }

    if (userData.status === 'approve') {
        return children
    }

    return <Navigate state={location.pathname}  to="/access-denied" />;

}

export default ApproveRoute