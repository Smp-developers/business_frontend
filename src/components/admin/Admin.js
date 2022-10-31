import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import "./explore.scss";
import NewStudents from './NewStudents';
import Batch_1 from './Batch_1';
import Batch_2 from './Batch_2';
import Courses from './Courses';
import Settings from './Settings'
import axios from 'axios';
import { Backend_url, Cloudinary_url } from '../../Config'
import CoursesList from './CoursesList';
import Trainee from './trainee/Trainee';
import jwtDecode from 'jwt-decode';
import Loader from '../loader/Loader';

const Admin = () => {
  const navigate = useNavigate()
  const [navVal, setNavVal] = useState('')
  const [user, setUser] = useState([])
  const [load, setLoad] = useState(false)

  const [trigger, settrigger] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('nav')) {
      setNavVal(localStorage.getItem('nav'))
    }
    else {
      localStorage.setItem('nav', 'newStudents')
      setNavVal('newStudents')
    }
  }, [trigger])

  useEffect(() => {
    setLoad(true)
    if (localStorage.getItem('userDetails')) {
      axios.get(`${Backend_url}/api/getting_single_students/${jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).user_id}`,
        {
          headers: {
            "Content-Type": "application/json",


            //SENDING AUTHORIZED ACCESS TOKEN TO GET THE RESULT
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userDetails')).access}`
          }
        }

      )
        .then(res => {

          setUser(res.data)
        })

    }

  }, [])






  const [newStudents, setNewStudents] = useState([])
  useEffect(() => {
    setLoad(true)
    axios.get(`${Backend_url}/api/get_none_batches/`).then((res) => {

      setNewStudents(res.data)



    })
  }, [trigger])


  const [batch1, setBatch1] = useState([])
  useEffect(() => {
    setLoad(true)
    axios.get(`${Backend_url}/api/get_all_batch1/`).then((res) => {

      setBatch1(res.data)

    })
  }, [trigger])


  const [batch2, setBatch2] = useState([])
  useEffect(() => {
    setLoad(true)
    axios.get(`${Backend_url}/api/get_all_batch2/`).then((res) => {

      setBatch2(res.data)

    })
  }, [trigger])


  const [courses, setCourses] = useState([])
  useEffect(() => {
    setLoad(true)
    console.log("triggered")
    axios.get(`${Backend_url}/api/get_all_courses/`).then((res) => {

      setCourses(res.data)

    })
  }, [trigger])


  const [trainees, setTrainees] = useState([])
  useEffect(() => {

    setLoad(true)
    axios.get(`${Backend_url}/api/get_all_trainees`).then((res) => {

      setTrainees(res.data)
      setTimeout(() => {
        setLoad(false)
      }, 2000)
    })
  }, [trigger])

  return (
    <div>

      {load === true && <Loader />}
      <div className="topNavbar">
        <div style={{ display: "flex",alignItems:"center" }}>
          <div className="icons">
            <i className="fa-solid fa-book-open"></i>
          </div>


          <div className="midone" >
            <div className="dataset">{user.first_name}</div>
            <div className="em">{user.email}</div>
          </div><div><i className="fa-solid fa-arrow-down invisi" style={{ background: "green", color: "white", padding: "5px", borderRadius: "50%" ,marginLeft:"10px"}} onClick={e => { settrigger(!trigger) }}></i></div>


        </div>
        <div className="endside" style={{ display: "flex", alignItems: "center" }}>
          <div className="visi" style={{ background: "green", color: "white", fontWeight: "600", padding: "5px", borderRadius: "5px" }}>
            <span style={{ cursor: "pointer" }} className="" onClick={e => { settrigger(!trigger) }}>Update</span>

          </div>
          <div className="dotsIcon visi">


            <div
              style={{

                marginRight: "20px",
                color: "white",
                cursor: "pointer",
                position: "relative",
              }}
              className="add "


            >
              <i className="fa-solid fa-gear" name="add"
                onClick={e => navigate('/frontend/admin/settings')}
              ></i>


            </div>
          </div>


        </div>
      </div>

      <div className="exploreContainer">
        <div className="bottomNav">
          <ul>
            <li onClick={e => {
              localStorage.setItem('nav', 'newStudents')
              setNavVal('newStudents')
            }} className={navVal === 'newStudents' ? 'borderPresent' : ''}>NewStudents</li>
            <li
              onClick={e => {
                localStorage.setItem('nav', 'batch1')
                setNavVal('batch1')
              }} className={navVal === 'batch1' ? 'borderPresent' : ''}>Batch 1</li>
            <li
              onClick={e => {
                localStorage.setItem('nav', 'batch2')
                setNavVal('batch2')
              }} className={navVal === 'batch2' ? 'borderPresent' : ''}>Batch 2</li>
            <li
              onClick={e => {
                localStorage.setItem('nav', 'courses')
                setNavVal('courseUpload')
              }} className={navVal === 'courseUpload' ? 'borderPresent' : ''}>Course Upload</li>
            <li
              onClick={e => {
                localStorage.setItem('nav', 'courses')
                setNavVal('courses')
              }} className={navVal === 'courses' ? 'borderPresent' : ''}>Courses List</li>
            <li
              onClick={e => {
                localStorage.setItem('nav', 'trainee')
                setNavVal('trainee')
              }} className={navVal === 'trainee' ? 'borderPresent' : ''}>Trainees</li>
          </ul>
        </div>
        <div className="decider">
          {navVal === 'newStudents' && <NewStudents newStudents={newStudents} settrigger={settrigger} trigger={trigger} />}
          {navVal === 'batch1' && <Batch_1 batch1={batch1} settrigger={settrigger} trigger={trigger} />}
          {navVal === 'batch2' && <Batch_2 batch2={batch2} settrigger={settrigger} trigger={trigger} />}
          {navVal === 'courseUpload' && <Courses settrigger={settrigger} trigger={trigger} />}
          {navVal === 'courses' && <CoursesList courses={courses} settrigger={settrigger} trigger={trigger} />}
          {navVal === 'trainee' && <Trainee trainees={trainees} settrigger={settrigger} trigger={trigger} />}
        </div>
      </div>
    </div>
  )
}

export default Admin