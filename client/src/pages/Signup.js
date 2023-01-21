import React,{useState} from 'react'
import {Link,useHistory} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../stylesheets/auth.module.css"

import Img from "../assets/signup.png"

const Signup = () => {

  const history=useHistory()

  const [fullname,setFullname]=useState("");
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const clickHandler=()=>{
    fetch('/signup',{
      method:"POST",
      body:JSON.stringify({fullname,username,email,password}),
      headers:{"Content-Type":"application/json"}
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error)
      {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 7000,
          });
      }
      else{
        toast.success(data.message, {
          position: "top-center",
          autoClose: 3000,
          })
          setTimeout(()=>history.push('/login'), 3000)
        
      }
    }).catch(err=>console.log(err))
  }
    return (
        <>
            <ToastContainer position="top-center" autoClose={7000}  />
             <div className={styles.container}>
             <div className={styles.image}>
                  <div>ChatSprint</div>
                  <img className={styles.img} src={Img} alt="Image not found" />
                  <div>Stay Connected with people while practicing social distancing !!</div>
                </div>
          <div className={styles.card}>
          <div className={styles.content}>
            <div>Signup</div>
           
            </div>
            <div className={styles.inputBox} >
                <input className={styles.input} type="text" placeholder="Enter your Fullname" name="fullname" autocomplete="off" 
                    value={fullname} onChange={e=>setFullname(e.target.value)} />

                 <input className={styles.input} type="text" placeholder="Enter your Username" name="username" autocomplete="off"
                    value={username} onChange={e=>setUsername(e.target.value)} />

                 <input className={styles.input} type="email" placeholder="Enter your Email" name="email" autocomplete="off"
                    value={email} onChange={e=>setEmail(e.target.value)} />
                    
                 <input className={styles.input} type="password" placeholder="Create Password" name="password"
                    value={password} onChange={e=>setPassword(e.target.value)} />
              </div>

                <div className={styles.belowInputs}>
                <button className={styles.button1} onClick={clickHandler}>Signup</button>
                    <div>Already have an account?</div>
                   <Link to="/login"><button className={styles.button2}>Login</button></Link>
                </div>

                </div> 
                 
        </div> 
        </>
    )
}

export default Signup
