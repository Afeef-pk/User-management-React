import React,{useEffect, useState} from 'react'
import { useSelector} from "react-redux"
import {  useNavigate } from "react-router-dom";
import Axios from 'axios'
import { userAPI } from '../../../Apl'
import "./MyAccount.css"

function MyAccount() {
    const navigate = useNavigate()
    const [UserData,setUserData]=useState({})
    const [image, setImage] = useState("")
    const [err,setErr] = useState('')
    const  User= useSelector(state=> state.user.userToken)
    if(!User){
        navigate("/")
    }
   useEffect(()=>{
        Axios.get(`${userAPI}userProfile`, { withCredentials: true }).then((response) => {
            setUserData(response.data.user)
            console.log(UserData.image);
        }).catch(error=>{
            console.log(error);
        })
        
   })

   const handleUpdateProfile = async()=>{
    try {
        const formData = new FormData();
        formData.append('image', image);
         await Axios.post(`${userAPI}editProfilePhoto`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response)=> {
            if (response.data.error) {
                console.log(response.data.error);
                setErr(response.data.error)
            } else {
                
            }
            navigate('/myAccount');
        }).finally(() => {
            setImage(""); 
          });
      } catch (error) {
        console.log(error);
      }
   }

    return (
        <div className=" mb-4 p-3 d-flex justify-content-center bgimg ">
        <div className="card">
            <div className=" image d-flex flex-column justify-content-center align-items-center">
                <button className="btn btn-secondary mt-4">
                    <img className='profileIMage' src={UserData.image ?`${userAPI}/images/${UserData.image}`:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}   height="150" width="300" alt='profile'/></button>
                <span className="name mt-3">{UserData?UserData.Name:""}</span>
                <span className="idd">{UserData?UserData.email:""}</span>
                <br />
                <div className=" d-flex mt-2">
                        <div className="text-center">
                            <input type="file" className="form-control" name="image" onChange={(e) => {
                                setImage(e.target.files[0])
                                setErr('')
                            }} />
                            {image && <br/>}
                             {image &&  <img style={{width:"150px",alignItems:'center'}} src={image ? URL.createObjectURL(image):""}  alt="avatar" />}
                             {err && <p style={{color:'red'}}>{err}</p>}
                                {image && <br/>}
                            <button className='custombutton' onClick={handleUpdateProfile} >Update Profile</button>
                        </div>
                    </div>                
                <div className="gap-5 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                    <span><i className="bi bi-twitter"></i></span>
                    <span><i className="bi bi-facebook"></i></span>
                    <span> <i className="bi bi-instagram"></i></span>
                    <span><i className="bi bi-linkedin"></i></span>
                </div> <div className=" px-2 rounded mt-4 date ">
                </div>
            </div>
        </div>
    </div>
    )
}

export default MyAccount
