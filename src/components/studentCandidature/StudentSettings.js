import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Popup from '../popup/Popup'
import { Backend_url } from '../../Config'
import jwtDecode from 'jwt-decode'

const StudentSettings = () => {
    const navigate = useNavigate()


    const [user, setUser] = useState([])
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