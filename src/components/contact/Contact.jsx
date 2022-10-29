import React, { useEffect, useState } from 'react'
import { Backend_url, Cloudinary_url } from '../../Config'
import Loader from '../loader/Loader'
import Alert from '../alert/Alert'
import axios from 'axios'
import './contact.css'

import { useContext, useRef } from "react";

import { ThemeContext } from "../../context";

const Contact = () => {
  const formRef = useRef();
  const [load, setLoad] = useState(false)
  const [msg, setMsg] = useState('')
  const [trans, setTrans] = useState('')
  const [color, setColor] = useState('')
  const [message, setMessage] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [done, setDone] = useState(false)
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

 
 



  const handleSubmit = (e) => {
    
    setLoad(true)
    axios.post(`${Backend_url}/api/sending_individual_mail`, {
      "subject": "Message from New student from home page", "message": `            
Hi Admin,

I am ${name}, and ${message}
                        
Thank you
my number is ${number}
`, "email": "smpdevelopers.official@gmail.com"
    }).then(res => {
      setColor("green")
      setTrans('0px')
      setMsg(`Batch update request sent successfully.......`)

      setDone(true)
      setTimeout(() => {
        setLoad(false)
        setTrans('-100px')
        setLoad(false)
        setNumber('')
        setMessage('')
        setEmail('')
        



      }, 3000)
      setTimeout(() => {
        setDone(false)
        



      }, 10000)
    }).catch(err => {
      setColor("red")
      setTrans('0px')
      setMsg('Error in sending batch request mail')

      setTimeout(() => {


        setTrans('-100px')
        setLoad(false)

      }, 3000)
    })
  }

  return (
    <div className="c">
     <div>
        {load === true && <Loader />}</div>
      <div className="c-bg"></div>
      <div className="c-wrapper">
        <div className="c-left">
          <h1 className="c-title">Let's discuss about the course</h1>
          <div className="c-info">
            <div className="c-info-item">
              <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_FMyxjAaI94R5vnM7BF0K5kdvz8JCv5iJV-DLtw&s'} alt="" className="c-icon" />
            
            <a href="https://api.whatsapp.com/send?phone=9490722524" style={{fontSize:"14px"}}>Send Message in 9490722524</a>
            </div>
            <div className="c-info-item">
              {/* <img className="c-icon" src={'https://cdn-icons-png.flaticon.com/512/761/761755.png'} alt="" />
              <a href="mailto:smpdevelopers.official@gmail.com" style={{fontSize:"14px"}}>smpdevelopers.official@gmail.com</a> */}
            </div>
           
          </div>
        </div>
        <div className="c-right">
          <p className="c-desc">
            <b>What’s your intrest about this course?</b> Get in touch with us. For course detailed structure.
          </p>
          <div className='form' >
            <input className="inputs" style={{backgroundColor: darkMode && "#333"}} type="text" placeholder="Name" name="user_name" value={name} onChange={e=>{setName(e.target.value)}} />
            <input className="inputs" style={{backgroundColor: darkMode && "#333"}} type="text" placeholder="Number" name="user_subject" value={number} onChange={e=>{setNumber(e.target.value)}} /><br />
            {/* Email Should be  @gmail.com <br /> */}
            <input className="inputs" style={{backgroundColor: darkMode && "#333"}} type="email" placeholder="Email Should be  @gmail.com " name="user_email" value={email} onChange={e=>{setEmail(e.target.value)}}/>
            <textarea className="textarea" style={{backgroundColor: darkMode && "#333"}} rows="5" placeholder="Message" name="message" value={message} onChange={e=>{setMessage(e.target.value)}}/>
            {(email !=='' && email.includes('@gmail.com') &&message !=='' && number !=='' && name !=='')?
            <button onClick={handleSubmit} className="Cbutton">Submit</button>
            
            :
            <>
            <button className="Cbutton" style={{background:"red",cursor:"not-allowed"}}>Submit</button> 
            {done ? <span style={{color:"green",fontWeight:"600",display:"block"}}>Thank you we received your mail we will get back to you...</span>: <span style={{color:"red",fontWeight:"600",display:"block"}}>Fill details to send</span> }
            </>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
