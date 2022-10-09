import "./sidebar.scss";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cloudinary_url,Backend_url } from "../../Config";
import axios from "axios";
import jwtDecode from "jwt-decode";


const Sidebar = () => {
  const [cross, setCross] = useState("bar");
  const [user, setUser] = useState([])
  useEffect(() => {
    if (localStorage.getItem('userDetails')) {
      axios.get(`${Backend_url}/api/getting_single_students/${jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).user_id}`)
      .then(res=>{
      
        setUser(prev=>[...prev,res.data])
      })
     
    }

  }, [localStorage.getItem('userDetails')])


  const handleClick = (e) => {
    if (cross === "bar"  ) {
      document.querySelector(".sidebar").style.width = "200px";
      document.querySelector("#checkbox").checked = true;
      setCross("cross");
    } else {
      document.querySelector("#checkbox").checked = false;
      setCross("bar");
      document.querySelector(".sidebar").style.width = "50px";
      const sides = document.querySelectorAll(".itemD");
      for (let i = 0; i < sides.length; i++) {
        sides[i].classList.remove("itemC_dis");
      }
    }
  };

  const handle = (e) => {
    if (cross === "bar" && window.screen.width>600) {
      
      document.querySelector(".sidebar").style.width = "180px";
      document.querySelector("#checkbox").checked = true;
      setCross("cross");
    }

    //  const sides = document.querySelectorAll('.side')
    //  for(let i=0;i<sides.length;i++){

    //   sides[i].classList.toggle('dis')

    //  }
  };
  const handleB = (e) => {
    document.querySelector("#checkbox").checked = false;
    setCross("bar");
    document.querySelector(".sidebar").style.width = "50px";
    const sides = document.querySelectorAll(".itemD");
    for (let i = 0; i < sides.length; i++) {
      sides[i].classList.remove("itemC_dis");
    }
  };

  //  document.querySelector(".sidebar").addEventListener('mouseleave',handleB)

  const navigate = useNavigate();
  return (
    <>
      <div
      className="sidebar"
      style={{ color: "white", backgroundColor: "#161b22" }}
      onMouseOver={(e) => {
        handle(e);
      }}
      onMouseLeave={handleB} 
    >
      <div className="navF">
        <div className="top">

          <Link to='/' ><img src={`${Cloudinary_url}/main_logo_vheqme_j3hi9m.png`} alt="" width={40} height={40} style={{ marginTop: "25px" }} /></Link>
        </div>
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          style={{
            position: "absolute",
            top: "12px",
            left: "18px",
            opacity: "0",
            cursor: "pointer",
          }}
        
        />

        <div className="">
          <ul>
            {user.length === 0 && <li
              onClick={() => {
                navigate("/login");
              }}
            >
              <i className="fa-solid fa-right-to-bracket"></i>
              <span className="side">Login</span>
            </li>}

            {/* <li
              onClick={() => {
                navigate("/courses");
              }}
            >
              <i className="fa-solid fa-book-open"></i>
              <span className="side">Course details</span>
            </li> */}

            {user.length > 0 && !user[0].is_superuser && <li
              onClick={() => {
                navigate("/candidature");
              }}
            >
              <i className="fa-solid fa-user"></i>
              <span className="side">Candidature</span>
            </li>}


            {user.length > 0 && (user[0].is_superuser && <li
              onClick={() => {
                navigate("/frontend/admin");
              }}
            >
              <i className="fa-solid fa-lock"></i>
              <span className="side">Administration</span>
            </li>)}






          </ul>
        </div>
        {user.length > 0 && <div className="bottom">
          <div className="item noti">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item help" style={{ fontSize: "20px" }}>
            <i className="fa-solid fa-power-off" onClick={e => {
             

              if (window.confirm('Do yo want to logout')) {
                localStorage.removeItem('userDetails')
                
                navigate('/')
                window.location.reload()
              }
            }}></i>
          </div>

          <div className="item profile">
            <img
              src={`${Cloudinary_url}/${user[0].image}`}
              alt=""
              className="avatar"

            />
          </div>
        
        </div>}
      </div>
    </div>
  
   
    </>
  );
};

export default Sidebar;
