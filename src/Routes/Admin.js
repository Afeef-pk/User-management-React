import React,{useEffect} from 'react'
import { Route, Routes } from "react-router-dom"
import AdminLoginPage from '../page/Admin/AdminLogin'
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from 'react-cookie'
import {AdminActions} from "../Redux/AdminAuth"
import AdminHome from '../page/Admin/AdminHome'
import AdminEdite from '../page/Admin/AdminEdite'
function Admin() {

  const [cookies] = useCookies(['jwt']);
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (Object.keys(cookies).length > 0) {
      dispatch(AdminActions.AddAdmin({token: cookies?.jwt?.Admintoken}))
    }
  },[])
  
  let Admin = useSelector(state => { return state.Admin.AdminToken })
  
  return ( 
    <div>
      <Routes>
        <Route path="/" element={Admin? <AdminHome/> :<AdminLoginPage/>} />
      </Routes>
      <Routes>
        <Route path="/AdminLogin" element={Admin? <AdminHome/> :<AdminLoginPage/>} />
      </Routes>
      <Routes>
        <Route path="/EditeUser"  element={Admin? <AdminEdite/> :<AdminLoginPage/>}/>
       
      </Routes>

    </div>
  )
}

export default Admin
