
import './studentCandidature.scss'


import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import "./explore.scss";

import axios from 'axios';
import { Backend_url, Cloudinary_url } from '../../Config'
import Popup from '../popup/Popup';
import TrainersStudent from './TrainersStudent';
import ProfileStudent from './ProfileStudent';
import StudentSchedule from './StudentSchedule';
import CoursesStudent from './CoursesStudent';
import jwtDecode from 'jwt-decode';


const StudentCandidature = () => {
  const navigate = useNavigate()
  const [navVal, setNavVal] = useState('schedules')
  const [user, setUser] = useState([])


  const [batchTrainers, setBatchTrainers] = useState([])

  const [updatedUserDetails, setUserDetails] = useState([])

  const [trainees, setTrainees] = useState([])
  useEffect(() => {
    axios.get(`${Backend_url}/api/get_all_trainees`).then((res) => {
      setTrainees(res.data)

    })
  }, [])










  useEffect(() => {
    if (localStorage.getItem('userDetails')) {
      axios.get(`${Backend_url}/api/getting_single_students/${jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).user_id}`,
      { headers: { 
        "Content-Type": "application/json",


        //SENDING AUTHORIZED ACCESS TOKEN TO GET THE RESULT
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userDetails')).access}`} }
      
      )
        .then(res => {

          setUser(res.data)
        })

    }

  }, [])

  useEffect(() => {
    axios.get(`${Backend_url}/api/getting_single_students/${jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).user_id}`,
    { headers: { 
      "Content-Type": "application/json",


      //SENDING AUTHORIZED ACCESS TOKEN TO GET THE RESULT
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userDetails')).access}`} }
    ).then(res => {
      setUserDetails(res.data)
    })
  }, [])


  useEffect(() => {
    if (updatedUserDetails.batch !== undefined) {
      axios.post(`${Backend_url}/api/get_batch_trainer`, { "batch": updatedUserDetails.batch }).then(res => {
        setBatchTrainers(res.data)
      })

    }
  }, [updatedUserDetails])










  const [courses, setCourses] = useState([])
  useEffect(() => {
    axios.get(`${Backend_url}/api/get_all_courses/`).then((res) => {
      setCourses(res.data)

    })
  }, [])




  return (
    <div>


      <div className="topNavbar">
        <div className="icons">
          <div className="dataset" style={{ color: "black", fontWeight: "600" }}>{user.id}</div>
        </div>
        <div className="midone" >
          <div className="dataset">{user.first_name}</div>
          <div className="em">{user.email}</div>
        </div>

        <div className="endside visi" >

          <div className="dotsIcon">

            <div
              style={{

                marginRight: "20px",
                color: "white",
                cursor: "pointer"

              }}
              className="add "
            >
              <i className="fa-solid fa-gear" name="add" onClick={e => navigate('/common/settings')}></i>

            </div>
          </div>
        </div>
      </div>

      <div className="exploreContainer">
        <div className="bottomNav" >
          <ul>
            <div>
              <li onClick={e => {
                setNavVal('schedules')
              }} className={navVal === 'schedules' ? 'borderPresent' : ''}>Schedules</li>
            </div>
            <div> <li
              onClick={e => {
                setNavVal('profile')
              }} className={navVal === 'profile' ? 'borderPresent' : ''}>Profile</li></div>
            <div><li
              onClick={e => {
                setNavVal('courses')
              }} className={navVal === 'courses' ? 'borderPresent' : ''}>Courses</li></div>
            <div> <li
              onClick={e => {
                setNavVal('trainers')
              }} className={navVal === 'trainers' ? 'borderPresent' : ''}>Trainers</li></div>


          </ul>
        </div>
        <div className="decider">
          {navVal === 'trainers' && <TrainersStudent trainees={trainees} />}
          {navVal === 'profile' && <ProfileStudent updatedUserDetails={updatedUserDetails} />}
          {navVal === 'schedules' && <StudentSchedule updatedUserDetails={updatedUserDetails} batchTrainers={batchTrainers} />}

          {navVal === 'courses' && <CoursesStudent courses={courses} />}
        </div>
      </div>
    </div>
  )
}

export default StudentCandidature