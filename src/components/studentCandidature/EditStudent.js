import React, { useEffect, useState } from 'react'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import Alert from '../alert/Alert'
import { Backend_url } from '../../Config'
import './edit.scss'
import Loader from '../loader/Loader'
import Popup from '../popup/Popup'
import jwtDecode from 'jwt-decode'
const EditStudent = () => {

    const [showModal, setShowModal] = useState(true)

    const [load, setLoad] = useState(false)
    const [msg, setMsg] = useState('')
    const [trans, setTrans] = useState('')
    const [color, setColor] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState('')
    const [college, setCollege] = useState('')
    const [name, setName] = useState('')
    const [graduation, setGraduation] = useState('')
    const [mobile, setMobile] = useState('')
    const [otp, setOTP] = useState('')
    const [randomotp, setRandomOTP] = useState('')
    const [experience, setExperience] = useState(0)
    const [social_media, setSocialMedia] = useState('')
    const [otpVerify, setVerify] = useState('')
    const [send, setSend] = useState('')
    const [next, setNext] = useState(false)




    const navigate = useNavigate()



    const [user, setUser] = useState([])


    useEffect(() => {
        if (localStorage.getItem('userDetails')) {
            axios.get(`${Backend_url}/api/getting_single_students/${jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).user_id}`)
            .then(res=>{
            
              setUser(res.data)
            })
           
          }
      
        setEmail(jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).email)
    }, [])
    useEffect(() => {

        setEmail(user.email)
        setName(user.first_name)
        setGraduation(user.year_of_graduation)
        setExperience(user.experience_in_python)
        setMobile(user.mobile)
        setCollege(user.college)
        setSocialMedia(user.social_media)
    }, [user])


    const handleSubmit = (e) => {
        setLoad(true)
        axios.post(`${Backend_url}/api/edit_student_profile/${user.email}`, {
            "email": email,
            "image": image,
            "name": name,
            "year_of_graduation": graduation,
            "experience_in_python": experience,
            "mobile": mobile,
            "college": college,
            "social_media": social_media
        }, { headers: { "Content-Type": "multipart/form-data" } }
        ).then(res => {
            setColor("green")
            setTrans('0px')
            setMsg('Updated  successfully....')


            setTimeout(() => {
                setTrans('-100px')
                localStorage.removeItem('userDetails')

                navigate('/login')
                window.location.reload()
                setLoad(false)

            }, 3000)


        }).catch(err => {
            setColor("red")
            setTrans('0px')
            setMsg('Error in updation details....')
            setTimeout(() => {
                setLoad(false)

                setTrans('-100px')


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
        var string = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
        let OTP = '';
        var len = string.length;
        for (let i = 0; i < 6; i++) {
            OTP += string[Math.floor(Math.random() * len)];
        }
        setRandomOTP(OTP)


        setLoad(true)
        axios.post(`${Backend_url}/api/sending_individual_mail`, {
            "subject": "OTP for Profile Update", "message": `            
Hi ${name},

Your required OTP for profile update ${OTP} if you didnt generated this please reach out to us.
                        
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
                setLoad(false)



            }, 3000)
        }).catch(err => {
            setColor("red")
            setTrans('0px')
            setMsg('Error in sending mail')
            setSend('fail')
            setTimeout(() => {


                setTrans('-100px')
                setLoad(false)

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
                {showModal && <Popup setShowModal={setShowModal} />}
                <Alert msg={msg} trans={trans} color={color} />
                {load === true && <Loader />}
                <div className="topNavbar">
                    <div className="icons">
                        <div className="dataset" style={{ color: "black", fontWeight: "600" }}>{user.id}</div>
                    </div>
                    <div className="midone" >
                        <div className="dataset">{user.first_name}</div>
                        <div className="em">{user.email}</div>
                    </div>

                    <div className="endside">

                        <div className="dotsIcon">

                            <div
                                style={{
                                    float: "right",
                                    marginRight: "20px",
                                    color: "white",
                                    cursor: "pointer",
                                    position: "relative",
                                }}
                                className="add visi"


                            >
                                <i class="fa-solid fa-gear" name="add"
                                    onClick={e => navigate('/student/settings')}
                                ></i>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='loginContainer exploreContainer' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                <div className='bottomBox'>

                    {next === false &&
                        <>
                            <div className='emailContainer'>
                                <label>Email</label>
                                <input type="email" disabled value={email} onChange={e => setEmail(e.target.value)} autocomplete="off" placeholder="Email" required />
                                {send === '' && email !== '' && <div className='emailVerify' onClick={e => { sendOtp(e) }}>
                                    send otp
                                </div>}
                                {send === 'success' &&
                                    <div className='success' onClick={e => { sendOtp(e) }}>
                                        <i class="fa-solid fa-check"></i>
                                    </div>}
                                {send === 'fail' && <div className='fail' onClick={e => { sendOtp(e) }}>
                                    <><div className='emailVerify danger' onClick={e => { sendOtp(e) }}>
                                        send otp
                                    </div>
                                        <i class="fa-solid fa-xmark"></i></>
                                </div>}
                            </div>
                            <br />


                            <div className='otp'>
                                <label>OTP</label>
                                <input type="text" value={otp} onChange={e => setOTP(e.target.value)} autocomplete="off" placeholder="Enter otp to signup" required />
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
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                }
                                {otpVerify === 'fail' &&
                                    <><div className='verify danger' onClick={e => { verifyOtp(e) }}>
                                        verify
                                    </div>
                                        <div className='fail' onClick={e => { verifyOtp(e) }}>
                                            <i class="fa-solid fa-xmark"></i>
                                        </div></>
                                }
                            </div>
                            <label>Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} autocomplete="off" placeholder="Name" required />
                            <label>Graduation Year</label>
                            <input type="year" value={graduation} onChange={e => setGraduation(e.target.value)} autocomplete="off" placeholder="year" required />

                            <button onClick={handleNext} style={{ float: "right" }}><i class="fa-solid fa-arrow-right"></i><span>Next</span></button>
                        </>
                    }

                    {next === true &&
                        <>

                            <><label>Experience</label>
                                <input type="number" value={experience} onChange={e => setExperience(e.target.value)} autocomplete="off" placeholder="Experience" required /></>

                            <label>Mobile</label>
                            <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} autocomplete="off" placeholder="mobile" required />
                            {user.role === 'student' && <><label>college</label>
                                <input type="text" value={college} onChange={e => setCollege(e.target.value)} autocomplete="off" placeholder="college" required /></>}
                            <label>Social Media</label>
                            <input type="text" value={social_media} onChange={e => setSocialMedia(e.target.value)} autocomplete="off" placeholder="Social links like instagram, linkedin,github" required />
                            <label>Image</label>
                            <input type="file" onChange={e => setImage(e.target.files[0])} required />

                            <button onClick={handleNext} ><i class="fa-solid fa-arrow-left"></i><span>Back</span></button>


                            {(otpVerify === 'success')
                                &&
                                (<button onClick={
                                    handleSubmit
                                } style={{ float: "right" }}><i class="fa-solid fa-right-to-bracket"></i><span>Update</span></button>)

                            }
                            {
                                (otpVerify === 'fail' || otpVerify === '')
                                &&
                                <button className='disable' style={{ float: "right" }}><i class="fa-solid fa-right-to-bracket"></i><span>Update</span></button>
                            }



                        </>
                    }
                </div>

            </div>
        </>
    )
}



export default EditStudent