
import React, { useEffect, useState } from 'react'
import FormContainer from '../FormContainer'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Alert from '../alert/Alert'


import { Backend_url } from '../../Config'
import './Login.scss'
import Loader from '../loader/Loader'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [load, setLoad] = useState(false)
  const [msg, setMsg] = useState('')
  const [trans, setTrans] = useState('')
  const [color, setColor] = useState('')
  const [otp, setOTP] = useState('')
  const [otpVerify, setVerify] = useState('')
  const [send, setSend] = useState('')
  const [randomotp, setRandomOTP] = useState('')
  
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const [passValid, setPassValid] = useState(false)
  const [newvisible, setNewVisible] = useState(false)

  const [matches, setMatches] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('userDetails')) {

      navigate('/')


    }
  }, [])




  const navigate = useNavigate()

  const handleSubmit = (e) => {
    setLoad(true)
    axios.post(`${Backend_url}/api/changePassword/${email}`, {

      "password": newPassword

    }
    ).then(res => {
      setColor("green")
      setTrans('0px')
      setMsg('Password updated successfully you are being directing to login....')


      setTimeout(() => {
        setTrans('-100px')
        

        navigate('/login')


      }, 3000)


    }).catch(err => {
      setColor("red")
      setTrans('0px')
      setMsg('issue occurs')
      setTimeout(() => {


        setTrans('-100px')
        setLoad(false)

      }, 3000)
    })

  }

  const sendOtp = (e) => {
    var string = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    let OTP = '';
    var len = string.length;
    for (let i = 0; i < 6; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    setRandomOTP(OTP)


    setLoad(true)
    axios.post(`${Backend_url}/api/sending_individual_mail`, {
      "subject": "OTP for forgot password", "message": `
Hi,

Your required OTP for forgot password ${OTP} if you didnt generated this please reach out to us.
                              
Thank you
with Regards,
Administration Team,
SMP Developers
      `, "email": email
    }).then(res => {
      setColor("green")
      setTrans('0px')
      setMsg(`OTP has been sent successfully.......`)
      setSend('success')

      setTimeout(() => {
        setLoad(false)
        setTrans('-100px')




      }, 3000)
    }).catch(err => {
      setColor("red")
      setTrans('0px')
      setMsg('Error in sending mail')
      setSend('fail')
      setTimeout(() => {


        setTrans('-100px')


      }, 3000)
    })
  }

  const verifyOtp = (e) => {
    
    if (otp === randomotp) {
      setVerify('success')
      setPassValid(true)
    }
    else {
      setVerify('fail')
      setPassValid(false)
    }
  }



  return (
    <>
      <div>
        <Alert msg={msg} trans={trans} color={color} />
        {load === true && <Loader />}
      </div>
      <div className='loginContainer' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div className="topBox">
          <div className='left'>
            <i className="fa-solid fa-key"></i>
          </div>
          <div className='right'>
            <span>Forgot Password</span>
            <br></br>
            <span>Change your password</span>
          </div>
        </div>
        <div className='bottomBox'>

          <div className='emailContainer'>
            <label>Email</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required autoComplete='off' />
            {send === '' && email !== '' && <div className='emailVerify' onClick={e => { sendOtp(e) }}>
              send otp
            </div>}
            {send === 'success' &&
              <div className='success' onClick={e => { sendOtp(e) }}>
                <i className="fa-solid fa-check"></i>
              </div>}
            {send === 'fail' && <div className='fail' onClick={e => { sendOtp(e) }}>
              <><div className='emailVerify danger' onClick={e => { sendOtp(e) }}>
                send otp
              </div>
                <i className="fa-solid fa-xmark"></i></>
            </div>}
          </div>

          <div className='otp'>
            <label>OTP</label>
            <input type="text" value={otp} onChange={e => setOTP(e.target.value)} autocomplete="off" placeholder="Enter otp to Login" required />
            {otpVerify === '' && otp !== '' &&
              <div className='verify' onClick={e => { verifyOtp(e) }}>
                verify
              </div>
            }
            {otpVerify === 'success' &&
              <div className='success' onClick={e => { verifyOtp(e) }}>
                <div className='verify' style={{ top: "5px", right: "26px" }} onClick={e => { verifyOtp(e) }}>
                  verify
                </div>
                <i className="fa-solid fa-check"></i>
              </div>
            }
            {otpVerify === 'fail' &&
              <><div className='verify danger' onClick={e => { verifyOtp(e) }}>
                verify
              </div>
                <div className='fail' onClick={e => { verifyOtp(e) }}>
                  <i className="fa-solid fa-xmark"></i>
                </div></>
            }
           
          </div>
          
          {passValid && <>
            <label> New Password</label>
            {!newvisible ?

              <div style={{ position: "relative" }} > 
                <input type="password" value={newPassword} id="passI" placeholder='Enter New password' 
                  onChange={e => {
                    setNewPassword(e.target.value)

                  }}

                />
                <i className="fa-solid fa-eye" style={{ position: "absolute", top: "7px", right: "20px" }} onClick={e => {
                  setNewVisible(true)

                }}></i>
              </div>
              :
              <div style={{ position: "relative" }} >
                <input type="text" value={newPassword} id="passI " placeholder='Enter Current password' onChange={e => {
                  setNewPassword(e.target.value)

                }} />
                <i className="fa-solid fa-eye-slash" style={{ position: "absolute", top: "7px", right: "20px" }} onClick={e => {

                  setNewVisible(false)
                }}></i>
              </div>
            }
            <label>Confirm password</label>
            <input type="text" id="mPass" value={confirm} onChange={e => {
              setConfirm(e.target.value)
              if (e.target.value === newPassword) {
                document.getElementById("mPass").style.border = "2px solid green"
                
                setMatches(true)
              }
              else {
                document.getElementById("mPass").style.border = "2px solid red"
                
                setMatches(false)
              }
            }} autocomplete="off" placeholder="Confirm passoword" required />



            {( newPassword !== "" && matches === true && passValid===true)
              &&
              (<button onClick={
                handleSubmit
              } style={{ float: "right" }}><i className="fa-solid fa-right-to-bracket"></i><span>Update Password</span></button>)

            }
            {
              ( newPassword === "" || matches === false || passValid===false)
              &&
              <button className='disable' style={{ float: "right" }}><i className="fa-solid fa-right-to-bracket"></i><span>Update Password</span></button>
            }
          </>}


         
        
        </div>
        
      </div>
    </>
  )
}



export default ForgotPassword