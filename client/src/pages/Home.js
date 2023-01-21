import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import Navbar from '../components/Navbar'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';

import styles from '../stylesheets/home.module.css'

const Home = () => {

    const [chats,setChats]=useState([]);
    const [chat,setChat]=useState("");
    const user=useSelector(state=>state.user)
    const [loggedUser,setLoggedUser]=useState(JSON.parse(localStorage.getItem('user')))
    useEffect(()=>{
        fetch('/messages/all',{
            method:'GET',
            headers:{"Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('token')}
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            setChats(data.chats)
        })
    },[])

    const displayChat=()=>{
        return (
            <>
                {
                    chat!=="" ? 
                   chat.chats.map(convo=>{
                      return (
                          <div key={convo._id} className={styles.displayChats}>
                              {
                                   convo.senderId==loggedUser._id ? <div className={styles.myMessages}>{convo.message.text}</div>
                                   : <div className={styles.yourMessages}>{convo.message.text}</div>
                              }
                          </div>
                         
                      )
                   })
                    :
                    <div className={styles.startConvo}>Start a Conversation!!</div>
                }
            </>
        )
    }

    const displayAllChats=({chat})=>{
        return (
            <>
            <div className={styles.sideChat} onClick={()=>setChat(chat)}>
                    {
                        chat.members.filter(member=>member._id!=loggedUser._id).map(member=>{
                            return (
                                <>
                                    <div className={styles.chatDp}><AccountCircleIcon  /></div>
                                    <div className={styles.sideChatInfo}>
                                        <div>{member.fullname}</div>
                                        <div className={styles.sideChatMessage}>{chat.chats[0].message.text}</div>
                                    </div>
                                </>
                            )
                        })
                    } 
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.leftPart}>
                    <div className={styles.search}>
                        <div className={styles.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            styles={{
                                root: styles.inputRoot,
                                input: styles.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={styles.sideChatContainer}>
                        {
                            chats.map(chat=>{
                                // console.log(chat)
                                return displayAllChats({chat})
                            })
                        }
                        
                        </div>
                </div>
                <div className={styles.rightPart}>
                    {
                        chat?<div className={styles.topbar}>
                        <div className={styles.user}>
                            <div className={styles.userdp}><AccountCircleIcon fontSize="large" /></div>
                            <div className={styles.userinfo}>
                                <div className={styles.username}>abcd</div>
                                <div className={styles.status}>online</div>
                            </div>
                        </div>
                        <div className={styles.options}>
                            <div className={styles.attach} className={styles.optionsIcons}><AttachFileIcon /></div>
                            <div className={styles.call} className={styles.optionsIcons}><CallIcon /></div>
                            <div className={styles.videoCall} className={styles.optionsIcons}><VideocamIcon /></div>
                        </div>
                    </div> : null
                    }
                    
                    <div className={styles.messageArea}>
                       {displayChat()}
                    </div>
                    {
                        chat? <div className={styles.bottomBarContainer}>
                        <div className={styles.bottomBar}>
                                <input type="text" placeholder="Type your message.." name="message" autoCorrect="off" autoComplete="off" />
                                <div className={styles.emoji}><EmojiEmotionsIcon /></div>
                                <div className={styles.send}><SendIcon /></div>
                        </div>
                        </div>
                        : null
                    }
                    
                </div>
            </div>
        </>
    )
}
export default Home
