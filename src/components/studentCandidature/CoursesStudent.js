

import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Cloudinary_url,Backend_url } from '../../Config'
import Alert from '../alert/Alert'
import Loader from "../loader/Loader";



const CoursesStudent = ({ courses }) => {

  const [load,setLoad] = useState(false)
  const [msg, setMsg] = useState('')
  const [trans, setTrans] = useState('')
  const [color, setColor] = useState('')

 


  return (
<>
<Alert msg={msg} trans={trans} color={color} />
    {load===true && <Loader />}
    {courses.length>0 ? <div style={{ padding: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }} className="cardContainer">
      {
        courses.map((c, index) => (
          <div className='card' key={index}>

            <img src={`${Cloudinary_url}/${c.image}`} width={150} height={150} alt="" />
            <div className='courseName'>
            <span style={{marginRight:"5px"}}>Course Name:</span>
              {c.course_name}</div>
            <div>
            <span style={{marginRight:"5px"}}>Trainer:</span>
              {c.course_author.slice(0,9)}
            </div>
           
           
          
           

          </div>
        ))
      }

    </div>
    
    :
    <div className="bottomOverView" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"300px"}}>
                            <h1>No Courses are available</h1>
                        </div>

    }
</>
  )
}

export default CoursesStudent