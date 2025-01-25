import useUserStore from '@/store/useUserStore'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  
  const {user} = useUserStore()
  let auth = user.token;

  return (
    <>
      auth.token ? <Outlet/> : <Navigate to="/login" />
    </>
  )
}

export default ProtectedRoute