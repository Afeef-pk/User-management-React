import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import {  Route, Routes } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { UserActions } from "../Redux/UserAuth";
import Home from '../page/User/Home'
import Login from '../page/User/LoginPage'
import Myaccount from '../page/User/Myaccount'
import Signup from '../page/User/SingnupPage'

function User() {

    const [cookies, setCookie] = useCookies(['jwt']);
    const dispatch = useDispatch()
    useEffect(() => {
        if (Object.keys(cookies).length > 0) {
            dispatch(UserActions.userAddDetails({ name: cookies.jwt.name, token: cookies.jwt.token }))
        }
    }, [])
    
    let User = useSelector(state => { return state?.user?.userToken })

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>

            <Routes>
                <Route path="/login" element={User ? <Home /> : <Login />} />
            </Routes>

            <Routes>
                <Route path="/signup" element={User ? <Home /> : <Signup />} />
            </Routes>

            <Routes>
                <Route path="/myAccount" element={<Myaccount />} />
            </Routes>
        </div>
    )
}

export default User
