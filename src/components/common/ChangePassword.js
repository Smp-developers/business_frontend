
import React, { useEffect, useState } from 'react'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import Alert from '../alert/Alert'
import { Backend_url } from '../../Config'
import './Signup.scss'
import Loader from '../loader/Loader'
import jwtDecode from 'jwt-decode'
const ChangePassword = () => {
  const [load, setLoad] = useState(false)
  const [msg, setMsg] = useState('')
  const [trans, setTrans] = useState('')
  const [color, setColor] = useState('')

  const [password, setPassword] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const [passValid, setPassValid] = useState(false)

  const [matches, setMatches] = useState(false)


  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [newvisible, setNewVisible] = useState(false)


  const [user, setUser] = useState([])
  useEffect(() => {
    if (localStorage.getItem('userDetails')) {
      axios.get(`${Backend_url}/api/getting_single_students/${jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).user_id}`,
      { headers: { 
        "Content-Type": "application/json",
        
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userDetails')).access}`} }
      )
      .then(res=>{
      
        setUser(res.data)
      })
     
    }

  }, [])











  const handleSubmit = (e) => {
    setLoad(true)
    axios.post(`${Backend_url}/api/changePassword/${user.email}`, {

      "password": newPassword

    }
    ).then(res => {
      setColor("green")
      setTrans('0px')
      setMsg('Password updated successfully you are being logging out....')


      setTimeout(() => {
        setTrans('-100px')
        localStorage.removeItem('userDetails')
        
        navigate('/login')
        window.location.reload()


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






  const checkPass = (e) => {
    axios.post(`${Backend_url}/api/check_original_password/${user.email}`,
      { "password": password }
    ).then(res => {
      if (res.data === 'success') {
        document.getElementById('passI').style.border = '2px solid green'
        setPassValid(true)
      }
      else {
        document.getElementById('passI').style.border = '2px solid red'
        setPassValid(false)
      }
    }).catch(err => {
      setColor("red")
      setTrans('0px')
      setMsg('Error in verify')

      setTimeout(() => {


        setTrans('-100px')


      }, 3000)
    })
  }






  return (
    <>
      <div>
        <Alert msg={msg} trans={trans} color={color} />
        {load === true && <Loader />}
      </div>
      <div className='loginContainer' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

        <div className='bottomBox'>


          <>


            <label> Current Password</label>
            {!visible ?
              <div style={{ position: "relative" }} >
                <input type="password" value={password} id="passI" placeholder='Enter new password'
                  onChange={e => {
                    setPassword(e.target.value)

                  }}

                />
                <i className="fa-solid fa-eye" style={{ position: "absolute", top: "7px", right: "20px" }} onClick={e => {
                  setVisible(true)

                }}></i>
                 <div className='cp' onClick={e => { checkPass(e) }}>
              verify
            </div>
              </div>
              :
              <div style={{ position: "relative" }} >
                <input type="text" value={password} id="passI" placeholder='Enter Current password' onChange={e => {
                  setPassword(e.target.value)

                }} />
                <i className="fa-solid fa-eye-slash" style={{ position: "absolute", top: "7px", right: "20px" }} onClick={e => {

                  setVisible(false)
                }}></i>
                 <div className='cp' onClick={e => { checkPass(e) }}>
              verify
            </div>
              </div>
            }

           


          </>

          {passValid && <>
            <label> New Password</label>
            {!newvisible ?

              <div style={{ position: "relative" }} > 
                <input type="password" value={newPassword} id="passI" placeholder='Enter Current password' 
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



            {(password !== '' && newPassword !== "" && matches === true && passValid===true)
              &&
              (<button onClick={
                handleSubmit
              } style={{ float: "right" }}><i className="fa-solid fa-right-to-bracket"></i><span>Update Password</span></button>)

            }
            {
              (password === '' || newPassword === "" || matches === false || passValid===false)
              &&
              <button className='disable' style={{ float: "right" }}><i className="fa-solid fa-right-to-bracket"></i><span>Update Password</span></button>
            }
          </>}

        </div>

      </div>
    </>
  )
}



export default ChangePassword