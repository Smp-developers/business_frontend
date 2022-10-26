import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './popup.scss'

import { Backend_url } from '../../Config'
import { useNavigate } from 'react-router'
import jwtDecode from 'jwt-decode'

const Popup = ({ setShowModal }) => {
    const [password, setPassword] = useState('')
    const [enc_password, setEncPassword] = useState('')

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userDetails')) {
            setEncPassword(jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).password)

        }
    }, [])
    const navigate = useNavigate()

    const handlePassword = (e) => {
        document.getElementById('passI').classList.remove('successs')
        document.getElementById('passI').classList.remove('fails')
        axios.post(`${Backend_url}/api/check_original_password/${jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).email}`,
            { "password": password }
        ).then(res => {
            if (res.data === 'success') {
                document.getElementById('passI').classList.add('successs')
                setTimeout(() => {
                    setShowModal(false)
                }, 1000)
            }
            else {
                document.getElementById('passI').classList.add('fails')

            }
        })
    }


    return (
        <div className='popUpContainer'>
            <div className='popup'>
                <div className='pass'>
                    <label>Enter Password to Edit/visit setting</label>
                    <i className="fa-solid fa-xmark" onClick={e => {
                        navigate('/')
                    }}></i>
                    {!visible ?
                        <>
                            <div style={{ position: "relative" }} >
                                <input type="password" value={password} id="passI"
                                    onChange={e => {
                                        setPassword(e.target.value)

                                    }}

                                />
                                <i className="fa-solid fa-eye" onClick={e => {
                                    setVisible(true)

                                }}></i>
                            </div>
                        </>
                        :
                        <>
                            <div style={{ position: "relative" }} >
                                <input type="text" value={password} id="passI" onChange={e => {
                                    setPassword(e.target.value)

                                }} />
                                <i className="fa-solid fa-eye-slash" onClick={e => {

                                    setVisible(false)
                                }}></i>
                            </div>
                        </>
                    }
                    <div>
                        <button className='btn' onClick={handlePassword}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup