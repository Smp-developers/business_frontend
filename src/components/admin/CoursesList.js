import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Cloudinary_url,Backend_url } from '../../Config'
import Alert from '../alert/Alert'
import Loader from "../loader/Loader";



const CoursesList = ({ courses,settrigger,trigger }) => {

  const [load,setLoad] = useState(false)
  const [msg, setMsg] = useState('')
  const [trans, setTrans] = useState('')
  const [color, setColor] = useState('')

  const navigate = useNavigate()



  

  const delete_course=(id,name)=>{
if(window.confirm(`Do you Want delete ${name}`)){
  setLoad(true)
  axios.get(`${Backend_url}/api/delete_single_course/${id}`).then(res=>{
    setColor("green")
    setTrans('0px')
    setMsg(`Course ${name} has been deleted successfully`)


    setTimeout(() => {
        setTrans('-100px')
        setLoad(false)
        // window.location.reload()
        settrigger(!trigger)



    }, 3000)
  }).catch(err => {
    setColor("red")
    setTrans('0px')
    setMsg('Error in deleting course')
    
    setTimeout(() => {


        setTrans('-100px')
        setLoad(false)

    }, 3000)
})
}
  }


  return (
<>
<Alert msg={msg} trans={trans} color={color} />
    {load===true && <Loader />}
    {courses.length>0 ? <div style={{ padding: "20px", display: "flex", gap: "30px", flexWrap: "wrap" }}>
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
           
            <i className="fa-solid fa-ellipsis-vertical" 
            onClick={e=>{
              document.getElementById(c.id).classList.toggle('dis')
              const subs=document.getElementsByClassName('sub')
              for(let i=0;i<subs.length;i++){
                if(subs[i].getAttribute('id')!=c.id){
                  subs[i].classList.remove('dis')
                }
              }
            }}
            ></i>
            <div className='sub' id={c.id}>
              <span 
              onClick={e=>{
                navigate(`updateCourse/${c.id}`)
              }}
              >Edit</span>
              <span onClick={e=>{
                delete_course(c.id,c.course_name)
              }}>Delete</span>
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

export default CoursesList