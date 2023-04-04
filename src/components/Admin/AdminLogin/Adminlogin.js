import React,{useState,useEffect} from 'react'
import classes from './AdminLogin.module.css';
import Button from "../../User/Button/Button"
import {  useNavigate } from "react-router-dom";        
import { AdminAPI } from '../../../Apl';
import Axios from 'axios'
import { useDispatch} from "react-redux"
import { AdminActions } from '../../../Redux/AdminAuth';

const Adminlogin = () => {
   const navigate= useNavigate()
   const dispatch= useDispatch()
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [Errmessage,setErrmessage]=useState('')
  
    useEffect(() => {setEmailIsValid(enteredEmail.includes('@'))}, [enteredEmail])
    useEffect(() => {setPasswordIsValid(enteredPassword.trim().length > 4) }, [enteredPassword])
    useEffect(() => {setFormIsValid(emailIsValid && passwordIsValid )}, [emailIsValid,passwordIsValid ])
  
    const emailChangeHandler = (event) => {setEnteredEmail(event.target.value); };
    const passwordChangeHandler = (event) => { setEnteredPassword(event.target.value); };


    const submitHandler = (event) => {
        event.preventDefault();
         Axios.post(`${AdminAPI}login`, { enteredEmail ,enteredPassword},{withCredentials:true}).then((response) => {
            const result = response.data.adminLogin   
            if (result.Status) {
                dispatch(AdminActions.AddAdmin({token:result.token}))
                navigate('/admin')
            } else {
                setErrmessage(result.message)
            }
        })
       
     };


    return (
        <div className='container'>
            <div className={classes.login} >
                <h5 className={classes.filogin} >Login</h5>
                <form onSubmit={submitHandler}>
                    <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''}`} >
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" id="email" value={enteredEmail} onChange={emailChangeHandler} />
                    </div>
                    <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''}`} >
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={enteredPassword} onChange={passwordChangeHandler} />
                    </div>
                    {Errmessage.length > 0 && <p style={{ color: 'red',textAlign:'center' }}  >{Errmessage}</p>}
                    <div className={classes.actions}>
                        <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Adminlogin
