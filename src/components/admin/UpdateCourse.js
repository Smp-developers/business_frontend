import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Backend_url, Cloudinary_url } from '../../Config'
import Alert from '../alert/Alert'
import Loader from "../loader/Loader";

const UpdateCourse = () => {
    const { id } = useParams()
    const [load, setLoad] = useState(false)
    const [msg, setMsg] = useState('')
    const [trans, setTrans] = useState('')
    const [color, setColor] = useState('')
    const [image, setImage] = useState('')
    const [author_image, setAuthorImage] = useState('')
    const [course, setCourse] = useState({
        image: "",
        course_name: "",
        course_author: "",
        author_image: "",
        author_designation: ""
    })
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${Backend_url}/api/get_single_course/${id}`).then(res => {
            setCourse({
                image: res.data.image,
                course_name: res.data.course_name,
                course_author: res.data.course_author,
                author_image: res.data.author_image,
                author_designation: res.data.author_designation
            })
        })
    }, [id])


    const handleUpdate = (e) => {
        if (window.confirm(`Do you want to update this course?`)) {
            setLoad(true)
            axios.post(`${Backend_url}/api/edit_single_course/${id}`,
                { "image": image, "course_name": course.course_name, "course_author": course.course_author, "author_designation": course.author_designation, "author_image": author_image }
                ,
                { headers: { "Content-Type": "multipart/form-data" } }
            ).then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`Course updated Successfully.....`)


                setTimeout(() => {
                    setTrans('-100px')

                    navigate('/frontend/admin')



                }, 3000)

            }).catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in  Updation')
                setTimeout(() => {


                    setTrans('-100px')
                    window.location.reload()

                }, 3000)
            })
        }
    }



    return (
        <>
            <Alert msg={msg} trans={trans} color={color} />
            {load === true && <Loader />}
            <div className='updateHolder'>
            <Link to={`/frontend/admin`} style={{fontSize:"20px",cursor:"pointer"}}><i className="fa-solid fa-arrow-left"></i></Link>

                <div className='left'>
                    <img src={`${Cloudinary_url}/${course.image}`} width={450} height={450} alt="" />

                </div>
                <div className='right'>

                    <div className='course'>
                        <div style={{ paddingLeft: "140px" }}>
                            <span className='so'> Update Image</span>
                            <input type="file" style={{ width: "300px" }} onChange={e => {
                                setImage(e.target.files[0])
                            }}
                            />
                        </div>
                        <div>
                           <span className="visi"> Course:</span> <input type="text" style={{ width: "300px" }} value={course.course_name} onChange={e => {
                                setCourse(prev => ({ ...prev, course_name: e.target.value }))
                            }} placeholder="Add Course name" />
                        </div>
                        <div>
                        <span className="visi"> Author:</span> <input type="text" style={{ width: "300px" }} value={course.course_author} onChange={e => {
                                setCourse(prev => ({ ...prev, course_author: e.target.value }))
                            }} placeholder="Add Course Author" />
                        </div>




                        <button className=''
                            onClick={handleUpdate} style={{ background: "orange", color: "white", border: "none", outline: "0", cursor: "pointer", padding: "5px" }}><i className="fa-solid fa-right-to-bracket" style={{ marginRight: "5px" }}></i><span>Update</span></button>



                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateCourse