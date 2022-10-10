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

  
  useEffect(() => {
    setLoad(true)
    if (localStorage.getItem('userDetails')) {
      axios.get(`${Backend_url}/api/getting_single_students/${jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).user_id}`,
      { headers: { 
        "Content-Type": "application/json",


        //SENDING AUTHORIZED ACCESS TOKEN TO GET THE RESULT
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userDetails')).access}`} }
      
      )
        .then(res => {
          setLoad(false)
          setUser(res.data)
        })

    }

  }, [])






  




 

 


  return (
    <div>
     
            {load === true && <Loader />}
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
               
                marginRight: "20px",
                color: "white",
                cursor: "pointer",
                position: "relative",
              }}
              className="add visi"


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
              setNavVal('newStudents')
            }} className={navVal === 'newStudents' ? 'borderPresent' : ''}>NewStudents</li>
            <li
              onClick={e => {
                setNavVal('batch1')
              }} className={navVal === 'batch1' ? 'borderPresent' : ''}>Batch 1</li>
            <li
              onClick={e => {
                setNavVal('batch2')
              }} className={navVal === 'batch2' ? 'borderPresent' : ''}>Batch 2</li>
            <li
              onClick={e => {
                setNavVal('courseUpload')
              }} className={navVal === 'courseUpload' ? 'borderPresent' : ''}>Course Upload</li>
            <li
              onClick={e => {
                setNavVal('courses')
              }} className={navVal === 'courses' ? 'borderPresent' : ''}>Courses List</li>
            <li
              onClick={e => {
                setNavVal('trainee')
              }} className={navVal === 'trainee' ? 'borderPresent' : ''}>Trainees</li>
          </ul>
        </div>
        <div className="decider">
          {navVal === 'newStudents' && <NewStudents  />}
          {navVal === 'batch1' && <Batch_1  />}
          {navVal === 'batch2' && <Batch_2 />}
          {navVal === 'courseUpload' && <Courses />}
          {navVal === 'courses' && <CoursesList  />}
          {navVal === 'trainee' && <Trainee />}
        </div>
      </div>
    </div>
  )
}

export default Admin