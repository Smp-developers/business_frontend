

import axios from 'axios'
import React, { useState } from 'react'



import { useNavigate } from 'react-router'
import { Cloudinary_url } from '../../Config'



const TrainersStudent = ({ trainees }) => {

    const [load, setLoad] = useState(false)
    const [msg, setMsg] = useState('')
    const [trans, setTrans] = useState('')
    const [color, setColor] = useState('')

    const navigate = useNavigate()

    


    return (
        <>
           
            {trainees.length > 0 ? <div style={{ padding: "20px", height: "350px", overflowY: "scroll", display: "flex", gap: "30px", flexWrap: "wrap" }}>
                {
                    trainees.map((c, index) => (
                        <div className='card' key={index}>

                            <img src={`${Cloudinary_url}/${c.image}`} width={150} height={150} alt="" />
                            <div className='courseName'>
                                <span style={{ marginRight: "5px" }}>Name:</span>
                                {c.first_name.slice(0)}</div>
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
                                {c.skills.slice(0)}
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

export default TrainersStudent