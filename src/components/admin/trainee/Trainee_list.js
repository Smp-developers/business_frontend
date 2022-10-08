import axios from 'axios'
import React, { useState } from 'react'
import Alert from '../../alert/Alert'
import { Backend_url, Cloudinary_url } from '../../../Config'
import Loader from '../../loader/Loader'
import { useNavigate } from 'react-router'



const Trainee_list = ({ trainees }) => {

    const [load, setLoad] = useState(false)
    const [msg, setMsg] = useState('')
    const [trans, setTrans] = useState('')
    const [color, setColor] = useState('')

    const navigate = useNavigate()

    


    return (
        <>
            <Alert msg={msg} trans={trans} color={color} />
            {load === true && <Loader />}
            {trainees.length > 0 ? <div style={{ padding: "20px", height: "350px", overflowY: "scroll", display: "flex", gap: "30px", flexWrap: "wrap" }}>
                {
                    trainees.map((c, index) => (
                        <div className='card' key={index} >

                            <img src={`${Cloudinary_url}/${c.image}`} width={150} height={150} alt="" />
                            <div className='courseName'>
                                <span style={{ marginRight: "5px" }}>Name:</span>
                                {c.first_name.slice(0,11)}</div>
                            <div>
                                <span style={{ marginRight: "5px" }}>Batch:</span>
                                {c.batch}
                            </div>
                            <div>
                                <span style={{ marginRight: "5px" }}>Company:</span>
                                {c.company.slice(0)}
                            </div>
                            <div>
                                <span style={{ marginRight: "5px" }}>Skills:</span>
                                {c.skills.slice(0,11)}
                            </div>
                            <i className="fa-solid fa-ellipsis-vertical"
                                onClick={e => {
                                    document.getElementById(c.id).classList.toggle('dis')
                                    const subs = document.getElementsByClassName('sub')
                                    for (let i = 0; i < subs.length; i++) {
                                        if (subs[i].getAttribute('id') != c.id) {
                                            subs[i].classList.remove('dis')
                                        }
                                    }
                                }}
                            ></i>
                            <div className='sub' id={c.id}>

                                <span onClick={e => {
                                    navigate(`viewProfile/${c.id}`)
                                }}>View</span>
                            </div>

                        </div>
                    ))
                }

            </div>
                :
                <div className="bottomOverView" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                    <h1>No Trainers are available</h1>
                </div>
            }
        </>
    )
}

export default Trainee_list