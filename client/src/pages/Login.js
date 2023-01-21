import React,{useState} from 'react'
import {Link,useHistory} from "react-router-dom"
import {useDispatch} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SetUser} from '../redux/user/actions'
import {SetToken} from '../redux/token/actions'
import styles from "../stylesheets/auth.module.css"

import Img from "../assets/login.png"
  

const Login = () => {  
  const history=useHistory()
  const dispatch=useDispatch()
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")

  const clickHandler=()=>{
      fetch('/login',{
        method:"POSt",
        body:JSON.stringify({username,password}),
        headers:{"Content-Type":"application/json"}
      }).then(res=>res.json())
      .then(data=>{
        if(data.error){
          toast.error(data.error, {
            position: "top-center",
            autoClose: 5000,
            })
        }
        else{
          localStorage.setItem("token",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch(SetUser(data.user))
          dispatch(SetToken(data.token))
          history.push("/")
        }
      })
  }

    return (
        <>
          <ToastContainer position="top-center" autoClose={5000}  />
        <div className={styles.container}>
          <div className={styles.card}>
          <div className={styles.content}>
            <div>Login</div>
           
            </div>
            <div className={styles.inputBox} >
                 
                 <input className={styles.input} type="text" placeholder="Username" name="username" autocomplete="off"
                    value={username} onChange={e=>setUsername(e.target.value)} />
                 <input className={styles.input} type="password" placeholder="Password" name="password"
                    value={password} onChange={e=>setPassword(e.target.value)} />
                 <div><Link to="">Forgot Password?</Link></div>
              </div>
                <div className={styles.belowInputs}>
                <button className={styles.button1} onClick={clickHandler} >Login</button>
                    <div>Don't have an account?</div>
                   <Link to="/signup"><button className={styles.button2}>Signup</button></Link>
                </div>
                </div> 
                <div className={styles.image}>
                  <div>ChatSprint</div>
                  <img className={styles.img} src={Img} alt="Image not found" />
                  <div>Stay Connected with people while practicing social distancing !!</div>
                </div>
          
        </div> 
        </>
    )
}

export default Login
