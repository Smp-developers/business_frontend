import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Popup from '../popup/Popup'

const StudentSettings = () => {
    const navigate = useNavigate()


    const [user, setUser] = useState([])
    useEffect(() => {
        if (localStorage.getItem('userDetails')) {
            setUser(JSON.parse(localStorage.getItem('userDetails')))
        }
        
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

                <div className="endside">

                    <div className="dotsIcon">

                        <div
                            style={{
                                float: "right",
                                marginRight: "20px",
                                color: "white",
                                cursor: "pointer",
                                position: "relative",
                            }}
                            className="add"


                        >


                        </div>
                    </div>
                </div>
            </div>
            <div style={{ padding: "20px", marginTop: "10px",display:"flex",flexWrap:"wrap", gap:"10px"}} className="">
                <div><span style={{ color: "red", fontSize: "18px", fontWeight: "600" }}>Note:</span> Edit your profile here</div>
                <div><Link to="/edit"><button className="sendIn" style={{  }}>Edit Profile</button></Link></div>
            </div>
            <div style={{ padding: "20px", marginTop: "10px",display:"flex",flexWrap:"wrap", gap:"10px" }} className="">
               <div> <span style={{ color: "red", fontSize: "18px", fontWeight: "600" }}>Note:</span> Change your password</div>
                <div><Link to="/changepassword"><button className="sendIn" >Change Password</button></Link></div>
            </div>


        </div>
    )
}

export default StudentSettings