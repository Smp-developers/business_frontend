import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Backend_url } from '../../Config'
import Alert from '../alert/Alert'
import Loader from '../loader/Loader'
import Popup from '../popup/Popup'

const Settings = () => {
  const [msg, setMsg] = useState('')
  const [trans, setTrans] = useState('')
  const [color, setColor] = useState('')
  const navigate = useNavigate()
  const [load, setLoad] = useState(false)
  const [showModal, setShowModal] = useState(true)


  const [user, setUser] = useState([])
  useEffect(() => {
    if (!localStorage.getItem('userDetails')) {
      window.location.reload()
      navigate('/')

    }
    else {
      setUser(JSON.parse(localStorage.getItem('userDetails')))
    }
  }, [])



  const delete_all_students = (e) => {

    if (window.confirm('Do you really want to delete all Branches')) {
      setLoad(true)
      axios.get(`${Backend_url}/api/delete_all_students`).then(() => {
        setColor("green")
        setTrans('0px')
        setMsg('Students Deleted  successfully....')


        setTimeout(() => {
          setTrans('-100px')
          navigate('/admin')
        }, 3000)
      })
        .catch(err => {
          setColor("red")
          setTrans('0px')
          setMsg('Error Occured')
          setTimeout(() => {


            setTrans('-100px')

          }, 3000)
        })
    }
    else {
      setLoad(false)
    }
  }


  const delete_courses = (e) => {


    if (window.confirm('Do you really want to delete all Courses')) {
      setLoad(true)
      axios.get(`${Backend_url}/api/delete_all_courses/`).then(() => {
        setColor("green")
        setTrans('0px')
        setMsg('Courses Deleted  successfully....')


        setTimeout(() => {
          setTrans('-100px')
          navigate('/admin')
        }, 3000)
      })
        .catch(err => {
          setColor("red")
          setTrans('0px')
          setMsg('Error Occured')
          setTimeout(() => {


            setTrans('-100px')

          }, 3000)
        })
    }
    else {
      setLoad(false)
    }
  }

  const switch_batch = (e) => {


    if (window.confirm('Do you really want to Switch branches')) {
      setLoad(true)
      axios.get(`${Backend_url}/api/switch_batches/`).then(() => {
        setColor("green")
        setTrans('0px')
        setMsg('Batches Switched  successfully....')


        setTimeout(() => {
          setTrans('-100px')
          setLoad(false)
        }, 3000)
      })
        .catch(err => {
          setColor("red")
          setTrans('0px')
          setMsg('Error Occured')
          setTimeout(() => {
            setLoad(false)

            setTrans('-100px')

          }, 3000)
        })
    }
    else {
      setLoad(false)
    }
  }
  return (
    <>
      <div >
        {showModal && <Popup setShowModal={setShowModal} />}
        <Alert msg={msg} trans={trans} color={color} />
        {load === true && <Loader />}
        <div style={{marginTop:"20px"}}>
          <div className="topNavbar">
            <div className="icons">
              <i className="fa-solid fa-book-open"></i>
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
                  className="add"


                >



                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="exploreContainer">
          <div style={{ padding: "20px", marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <div><span style={{ color: "red", fontSize: "18px", fontWeight: "600" }}>Note:</span> This action will be done after the one month of batch starts</div>
            <div><button onClick={switch_batch} className="sendIn" >Switch Batches</button></div>
          </div>
          <div style={{ padding: "20px", marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <div><span style={{ color: "red", fontSize: "18px", fontWeight: "600" }}>Note:</span> This action will be done to delete entire courses
            </div>
            <div> <button onClick={delete_courses} className="sendIn" >Delete Courses</button></div>
          </div>
          <div style={{ padding: "20px", marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <div><span style={{ color: "red", fontSize: "18px", fontWeight: "600" }}>Note:</span> This action will be done after course is completed</div>
            <div><button onClick={delete_all_students} className="sendIn" >Delete All Students</button></div>
          </div>
          <div style={{ padding: "20px", marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "10px" }} className="visi">
            <div><span style={{ color: "red", fontSize: "18px", fontWeight: "600" }}>Note:</span> Edit your profile here</div>
            <div><Link to="/frontend/editAdmin"><button className="sendIn" >Edit Profile</button></Link></div>
          </div>
          <div style={{ padding: "20px", marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "10px" }} className="visi">
            <div><span style={{ color: "red", fontSize: "18px", fontWeight: "600" }}>Note:</span> Change your password</div>
            <div><Link to="/changepassword"><button className="sendIn" >Change Password</button></Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings