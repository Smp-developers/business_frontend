import React, { useEffect, useState } from 'react'
import FormContainer from '../FormContainer'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Alert from '../alert/Alert'
import jwtDecode from 'jwt-decode'


import { Backend_url } from '../../Config'
import './Login.scss'
import Loader from '../loader/Loader'

const Login = () => {
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
  const [visible, setVisible] = useState(false)
 




  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoad(true)
    await axios.post(`${Backend_url}/api/token/`, {
      "email": email,
      "password": password,

    }
    ).then(res => {
      setColor("green")
      setTrans('0px')
      setMsg('Logged in successfully....')
     
      
      

      setTimeout(() => {
        setTrans('-100px')
        setLoad(false)
        localStorage.setItem('userDetails', JSON.stringify(res.data))
       
        navigate('/')
        window.location.reload()


      }, 3000)
    })
      .catch(err => {
        setColor("red")
        setTrans('0px')
        setMsg('Check Credentials')
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
      "subject": "OTP for Login", "message": `
Hi,

Your required OTP for Login ${OTP} if you didnt generated this please reach out to us.
                  
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

        setLoad(false)
        setTrans('-100px')


      }, 3000)
    })
  }

  const verifyOtp = (e) => {
   
    if (otp === randomotp) {
      setVerify('success')
    }
    else {
      setVerify('fail')
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
            <span>Welcome Back</span>
            <br></br>
            <span>Login with Email and Password</span>
          </div>
        </div>
        <div className='bottomBox'>

          <div className='emailContainer'>
            <label>Email</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required autoComplete='off' />
            {/* {send === '' && email !== '' && <div className='emailVerify' onClick={e => { sendOtp(e) }}>
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
            </div>} */}
          </div>
          <br />
          <label>Password</label>
          {visible ?
            <div style={{ position: "relative" }} >
              <input type="password" value={password} id="passI" autoComplete="new-password"
                onChange={e => {
                  setPassword(e.target.value)

                }}

              />
              <i className="fa-solid fa-eye" style={{ position: "absolute", top: "7px", right: "20px" }} onClick={e => {
                setVisible(false)

              }}></i>
            </div>
            :
            <div style={{ position: "relative" }} >
              <input type="text" value={password} id="passI" autoComplete="new-password" onChange={e => {
                setPassword(e.target.value)

              }} />
              <i className="fa-solid fa-eye-slash" style={{ position: "absolute", top: "7px", right: "20px" }} onClick={e => {

                setVisible(true)
              }}></i>
            </div>
          }


          <div className='otp'>
            {/* <label>OTP</label>
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
            } */}
            <Link to='/forgotpassword' style={{marginTop:"10px",marginLeft:"10px"}}>Forgot password</Link>
          </div>
          {(email !== '' && password !== '' )
            &&
            (<button onClick={
              handleSubmit
            } style={{ float: "right" }}><i className="fa-solid fa-right-to-bracket"></i><span>Login</span></button>)

          }
          {
            (email === '' || password === '' )
            &&
            <button className='disable' style={{ float: "right" }}><i className="fa-solid fa-right-to-bracket"></i><span>Login</span></button>
          }
        </div>
        <div className="belowBox">


          <span>Dont have account?</span>

          <span style={{marginLeft:"-20px"}}><Link to='/signup'>Sign up</Link></span>

        </div>
      </div>
    </>
  )
}



export default Login