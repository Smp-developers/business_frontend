import axios from 'axios'
import React, { useState } from 'react'
import Alert from '../alert/Alert'
import { Backend_url } from '../../Config'
import Loader from '../loader/Loader'
const Courses = ({settrigger,trigger}) => {


  const [image, setImage] = useState('')

  const [course_name, setCourseName] = useState('')
  const [course_author, setCourseAuthor] = useState('')

  const [msg, setMsg] = useState('')
  const [trans, setTrans] = useState('')
  const [color, setColor] = useState('')

  const [load, setLoad] = useState(false)

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  const uploadCourse = (e) => {
    setLoad(true)
    axios.post(`${Backend_url}/api/course_upload/`,
      { 'image': image, 'course_name': course_name, 'course_author': course_author, },
      { headers: { "Content-Type": "multipart/form-data" } }

    ).then(res => {

      setColor("green")
      setTrans('0px')
      setMsg(`${course_name} course has been added successfully`)


      setTimeout(() => {
        setTrans('-100px')
        // window.location.reload()
        setLoad(false)
        settrigger(!trigger)



      }, 3000)
    })
      .catch(err => {
        setColor("red")
        setTrans('0px')
        setMsg('Error in uploading course')
        setTimeout(() => {

          setLoad(false)
          setTrans('-100px')


        }, 3000)
      })
  }

  return (
    <>
      <Alert msg={msg} trans={trans} color={color} />
      {load === true && <Loader />}
      <div className='course'>
        <div style={{ paddingLeft: "140px" }}>
         <span className='so'> Add Course Image</span>
          <input type="file" style={{ width: "300px" }} onChange={handleImage} />
        </div>
        <div>
          <input type="text" style={{ width: "300px" }} onChange={e => { setCourseName(e.target.value) }} placeholder="Add Course name" />
        </div>
        <div>
          <input type="text" style={{ width: "300px" }} onChange={e => { setCourseAuthor(e.target.value) }} placeholder="Add Course Author" />
        </div>



        {(image !== '' && course_name !== '' && course_author !== '')
          &&
          (<button onClick={uploadCourse} className='' style={{ float: "right", background: "orange", color: "white", border: "none", outline: "0", cursor: "pointer" }}><i className="fa-solid fa-right-to-bracket" style={{ marginRight: "5px" }}></i><span>Upload</span></button>)

        }
        {
          (image === '' || course_name === '' || course_author === '')
          &&
          <button className='sendIn disable' style={{ float: "right" }}><i className="fa-solid fa-right-to-bracket"></i><span>Upload</span></button>
        }
      </div>
    </>
  )
}

export default Courses