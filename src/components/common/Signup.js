
import React, { useEffect, useState } from 'react'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import Alert from '../alert/Alert'
import { Backend_url } from '../../Config'
import './Signup.scss'
import Loader from '../loader/Loader'

const Signup = () => {
  const [load, setLoad] = useState(false)
  const [msg, setMsg] = useState('')
  const [trans, setTrans] = useState('')
  const [color, setColor] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [college, setCollege] = useState('')
  const [name, setName] = useState('')
  const [graduation, setGraduation] = useState('')
  const [mobile, setMobile] = useState('')
  const [otp, setOTP] = useState('')
  const [randomotp, setRandomOTP] = useState('')

  const [social_media, setSocialMedia] = useState('')
  const [otpVerify, setVerify] = useState('')
  const [send, setSend] = useState('')
  const [next, setNext] = useState(false)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [experience, setExperience] = useState('')


  const handleSubmit = (e) => {
    setLoad(true)
    axios.post(`${Backend_url}/api/signup/`, {
      "email": email,
      "password": password,
      "image": image,
      "name": name,
      "year_of_graduation": graduation,
      "mobile": mobile,
      "college": college,
      "social_media": social_media,
      "experience": experience
    }, { headers: { "Content-Type": "multipart/form-data" } }
    ).then(res => {
      setColor("green")
      setTrans('0px')
      setMsg('Register in successfully please login with the credentials....')


      setTimeout(() => {
        setTrans('-100px')
       
        
        navigate('/login')


      }, 3000)


    }).catch(err => {
      setColor("red")
      setTrans('0px')
      setMsg('Check email already exits')
      setTimeout(() => {


        setTrans('-100px')
        setLoad(false)

      }, 3000)
    })

  }

  const handleNext = (e) => {
    if (next === false) {
      setNext(true)
    }
    else {
      setNext(false)
    }
  }




  const sendOtp = (e) => {

    var string = `0123456789`;
    let OTP = '';
    var len = string.length;
    for (let i = 0; i < 6; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    setRandomOTP(OTP)


    setLoad(true)
    axios.post(`${Backend_url}/api/sending_individual_mail`, {
      "subject": "OTP for Signup", "message": `
Hi,

Your required OTP for Signup ${OTP} if you didnt generated this please reach out to us.
                        
Thank you
with Regards,
Administration Team,
SMP Developers
`, "email": email
    }).then(res => {
      document.getElementById('email').disabled = true
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
   setOTP(e.target.value)
    if (e.target.value == randomotp && e.target.value!=='') {
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
            <span>Welcome to SMP</span>
            <br></br>
            <span>Please Signup</span>
          </div>
        </div>
        <div className='bottomBox'>

          {next === false &&
            <>
              <div className='emailContainer'>
                <label className='imp'>Email</label>
                <input type="email" value={email} id="email" onChange={e => setEmail(e.target.value)} autocomplete="off" placeholder="Email" required />
                {send === '' && (email.includes('@gmail.com') || email.includes('@outlook.com')) && <div className='emailVerify' onClick={e => { sendOtp(e) }}>
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
              <br />

              <label className='imp'>Password</label>
              {visible ?
                <div style={{ position: "relative" }} >
                  <input type="password" value={password} id="passI"
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
                  <input type="text" value={password} id="passI" onChange={e => {
                    setPassword(e.target.value)

                  }} />
                  <i className="fa-solid fa-eye-slash" style={{ position: "absolute", top: "7px", right: "20px" }} onClick={e => {

                    setVisible(true)
                  }}></i>
                </div>
              }



              <div className='otp'>
                <label className='imp'>OTP</label>
                <input type="text" value={otp} onChange={e =>  verifyOtp(e)} autocomplete="off" placeholder="Enter otp to signup" required />
                {/* {otpVerify === '' && otp !== '' &&
                  <div className='verify' onClick={e => { verifyOtp(e) }}>
                    verify
                  </div>
                } */}
                {otpVerify === 'success' &&
                  <div className='success' >
                    {/* <div className='verify' style={{ top: "5px", right: "26px" }} onClick={e => { verifyOtp(e) }}>
                      verify
                    </div> */}
                    <i className="fa-solid fa-check"></i>
                  </div>
                }
                {otpVerify === 'fail' &&
                  <>
                  {/* <div className='verify danger' >
                    verify
                  </div> */}
                    <div className='fail'>
                      <i className="fa-solid fa-xmark"></i>
                    </div></>
                }
              </div>
              <label className='imp'>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} autocomplete="off" placeholder="Name" required />
              <label className='imp'>Mobile</label>
              <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} autocomplete="off" placeholder="mobile" required />
             

              <button onClick={handleNext} style={{ float: "right" }}><i className="fa-solid fa-arrow-right"></i><span>Next</span></button>
            </>
          }

          {next === true &&
            <>
              <label>Experience (optional)</label>
              <input type="number" value={experience} onChange={e => setExperience(e.target.value)} autocomplete="off" placeholder="Experience" required />
              <label>Graduation Year (optional)</label>
              <input type="year" value={graduation} onChange={e => setGraduation(e.target.value)} autocomplete="off" placeholder="year" required />
              <label className='imp'>college</label>
              <input type="text" value={college} onChange={e => setCollege(e.target.value)} autocomplete="off" placeholder="college" required />
              <label>Social Media (optional)</label>
              <input type="text" value={social_media} onChange={e => setSocialMedia(e.target.value)} autocomplete="off" placeholder="Social links like instagram, linkedin,github" required />
              <label className='imp'>Profile Pic</label>
              <input type="file"   onChange={e => setImage(e.target.files[0])} required/>

              <button onClick={handleNext} ><i className="fa-solid fa-arrow-left"></i><span>Back</span></button>

              {(email !== '' && password !== '' && image !== "" &&  mobile !== '' && college !== '' && otpVerify === 'success' &&name !=='')
                &&
                (<button onClick={
                  handleSubmit
                } style={{ float: "right" }}><i className="fa-solid fa-right-to-bracket"></i><span>Signup</span></button>)

              }
              {
                (email === '' || password === '' || image === "" ||  mobile === '' || college === '' ||  otpVerify !== 'success'|| name ==='' )
                &&
                <button className='disable' style={{ float: "right" }}><i className="fa-solid fa-right-to-bracket"></i><span>Signup</span></button>
              }

            </>
          }
        </div>
        <div className="belowBox">


          <span>Already have account?</span>

          <Link to='/login'>Login</Link>

        </div>
      </div>
    </>
  )
}



export default Signup