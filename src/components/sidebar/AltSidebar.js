import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Cloudinary_url } from "../../Config";
import { Backend_url } from '../../Config';
import jwtDecode from 'jwt-decode';

const AltSidebar = () => {
    const [user, setUser] = useState([])
    const [loc, setLoc] = useState(false)
    const [loadN, setLoadN] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userDetails')) {
            setLoc(true)
            setLoadN(true)
            axios.get(`${Backend_url}/api/getting_single_students/${jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).user_id}`,

                {
                    headers: {
                        "Content-Type": "application/json",


                        //SENDING AUTHORIZED ACCESS TOKEN TO GET THE RESULT
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userDetails')).access}`
                    }
                }
            )
                .then(res => {
                    setLoadN(false)
                    setUser(prev => [...prev, res.data])
                })

        }

    }, [])


    const hiddenHandle = (e) => {
        document.querySelector('.altSidebar').classList.toggle('hI')
        document.querySelector('.hiddenMenu').classList.toggle('di')

    }

    const hiddenRemoval = (e) => {
        if (!e.target.classList.contains('fa-bars')) {
            document.querySelector('.altSidebar').classList.remove('hI')
            document.querySelector('.hiddenMenu').classList.remove('di')
        }

    }



    document.body.addEventListener('click', hiddenRemoval)

    const navigate = useNavigate();
    return (
        <div className='altSidebar'>
            <div className='wrapperC'>

                <div className='menu' onClick={hiddenHandle}> <i className="fa-solid fa-bars"></i></div>
                <div style={{display:"flex",alignItems:"center"}}>{user.length === 0 && !loc && <span
                    onClick={() => {
                        navigate("/login");
                    }}
                >

                    <span className="side" style={{marginRight:"25px"}}>Login</span>
                </span>}

                    {user.length === 0 && !loc && <span
                        onClick={() => {
                            navigate("/signup");
                        }}
                    >

                        <span className="side">Signup</span>
                    </span>}
                </div>

                {loadN ? <div style={{ marginLeft: "5px" }}>Fetching your details.....</div>:user.length !== 0 && <div>  <Link to='/' ><img src={`${Cloudinary_url}/main_logo_vheqme_j3hi9m.png`} alt="" width={40} height={40} /></Link></div>}
                


            </div>
            <div className='hiddenMenu'>
                {user.length > 0 && user[0].is_superuser && <div
                    style={{
                        float: "right",
                        marginRight: "20px",
                        color: "white",
                        cursor: "pointer",
                        position: "relative",
                    }}
                    className="add invisi"


                >
                    <i class="fa-solid fa-gear" name="add"
                        onClick={e => navigate('/frontend/admin/settings')}
                    ></i>

                </div>}

                <ul>
                    {user.length === 0 && !loc && <li
                    // onClick={() => {
                    //     hiddenHandle()
                    //     navigate("/login");
                    // }}
                    >

                        <span className="">Please Login !</span>
                    </li>}

                    {/* {user.length === 0 && !loc && <li
                        onClick={() => {
                            hiddenHandle()
                            navigate("/signup");
                        }}
                    >

                        <span className="">Signup</span>
                    </li>} */}

                   

                    {user.length > 0 && <li onClick={hiddenHandle}>
                        <img
                            src={`${Cloudinary_url}/${user[0].image}`}
                            width={30} height={30} style={{ borderRadius: "50%" }}
                            alt=""
                            className="avatar"

                        />
                        <span className="nameI" style={{ marginLeft: "8px" }}>{user[0].first_name}</span>
                    </li>}


                    {user.length > 0 && !user[0].is_superuser && <li
                        onClick={() => {
                            hiddenHandle()
                            navigate("/candidature");
                        }}
                    >

                        <span className="">Candidature</span>
                    </li>}

                    {user.length > 0 && (user[0].is_superuser && <li
                        onClick={() => {
                            hiddenHandle()
                            navigate("/frontend/admin");
                        }}
                    >

                        <span className="">Administration</span>
                    </li>)}

                    {/* {user.length > 0 && (user[0].is_superuser && <li
                        onClick={() => {
                            navigate("/frontend/admin/settings");
                        }}
                    >

                        <span className="">Settings</span>
                    </li>)} */}


                    {user.length > 0 && <li
                        onClick={() => {
                            hiddenHandle()
                            navigate("/edit");
                        }}
                    >

                        <span className="">Edit Profile</span>
                    </li>}





                    {user.length > 0 && <li
                        onClick={() => {
                            hiddenHandle()
                            navigate("/changePassword");
                        }}
                    >

                        <span className="">Change password</span>
                    </li>}
                    {user.length > 0 && <>

                        <li onClick={e => {


                            if (window.confirm('Do yo want to logout')) {
                                localStorage.removeItem('userDetails')

                                navigate('/')
                                window.location.reload()
                            }
                        }}>
                            <i className="fa-solid fa-power-off" style={{ marginLeft: "-2px" }}></i>
                            <span className="" style={{ marginLeft: "8px" }}>Logout</span>
                        </li>



                    </>}





                </ul>



            </div>
        </div>
    )
}

export default AltSidebar