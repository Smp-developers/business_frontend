import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from '../src/components/sidebar/Sidebar'
import Home from "./pages/Validation_home/Home";
import './App.css'
import './pages/Validation_home/home.css'
import Login from "./components/common/Login";
import Signup from './components/common/Signup'

import StudentCandidature from './components/studentCandidature/StudentCandidature'
import Admin from "./components/admin/Admin";
import Settings from "./components/admin/Settings";
import ViewProfile from "./components/admin/ViewProfile";
import UpdateCourse from "./components/admin/UpdateCourse";
import StudentSettings from "./components/studentCandidature/StudentSettings";
import EditStudent from "./components/studentCandidature/EditStudent";
import EditAdmin from './components/admin/EditAdmin'
import ChangePassword from "./components/common/ChangePassword";
import ForgotPassword from "./components/common/ForgotPassword";
import AltSidebar from "./components/sidebar/AltSidebar";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Backend_url } from "./Config";
import AltSignup from "./components/common/AltSignup";
import Alert from "./components/alert/Alert";
import Loader from "./components/loader/Loader";


const App = () => {
  const [valid, setValid] = useState(false)
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(true)

  const [msg, setMsg] = useState('')
  const [trans, setTrans] = useState('')
  const [color, setColor] = useState('')

  const [load,setLoad] = useState(false)
  
 
  useEffect(() => {
    if (localStorage.getItem('userDetails')) {
      setUser(true)
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

          if (res.data.is_superuser) {
            setValid(true)
          }
        })

    }

  }, [])


  useEffect(() => {
    if (localStorage.getItem('userDetails')) {

      axios.post(`${Backend_url}/api/check_login_password/${jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).email}`, {

        "enc_pass": jwtDecode(JSON.parse(localStorage.getItem('userDetails')).refresh).password

      }

      )
        .then(res => {
          if(res.data==='Miss-matched'){
            setLoad(true)
            setColor("red")
            setTrans('0px')
            setMsg('Your password is changed by some other device please login again.....')

            setTimeout(()=>{
              localStorage.removeItem('userDetails')
              setLoad(false)
              setTrans('-100px')
             window.location.reload()
            },3000)
          }
          console.log(res.data)
        })

    }

  }, [])





  const updateToken = () => {
    console.log('updated token')
    if (localStorage.getItem('userDetails')) {
      axios.post(`${Backend_url}/api/token/refresh/`, {
        "refresh": JSON.parse(localStorage.getItem('userDetails')).refresh

      }).then(res => {

        if (res.status === 200) {
          localStorage.setItem('userDetails', JSON.stringify(res.data))

        }
        else {
          window.location.reload()
          localStorage.removeItem('userDetails')

        }


      })
    }
  }


  useEffect(() => {
    let count = 1000 * 60 * 14
    let interval = setInterval(() => {
      if (localStorage.getItem('userDetails')) {
        updateToken()
      }
    }, count)
    return () => clearInterval(interval)
  }, [loading])






  return (
    <div>
    <Alert msg={msg} trans={trans} color={color} />
    {load === true && <Loader />}
      <BrowserRouter>

        <div className="home">
          <Sidebar />
          <div className="homeContainer" >
            <AltSidebar />

            <div style={{ padding: "10px" }} className="routeContainer">
              <Routes>
                <Route index element={<Home />} />
                {!user && <Route path="login" element={<Login />} />}

                {/* ONCE MEETING SET PLEASE ACTIVATE THIS ROUTE INSTEAD OF ALTSIGNUP */}

                {!user && <Route path="signup" element={<Signup />} />}

                {/* {!user && <Route path="signup" element={<AltSignup />} />} */}

                {user ? <Route path="candidature" element={<StudentCandidature />} /> : <Route path="candidature" element={<Login />} />}
                {user ? <Route path="common/settings" element={<StudentSettings />} /> : <Route path="common/settings" element={<Login />} />}
                {user ? <Route path="edit" element={<EditStudent />} /> : <Route path="edit" element={<Login />} />}
                {/* {valid &&<Route path="frontend/editAdmin" element={<EditAdmin />} />} */}
                {valid && <Route path="frontend/admin" element={<Admin />} />}
                {valid && <Route path="frontend/admin/viewProfile/:id" element={<ViewProfile />} />}
                {valid && <Route path="frontend/admin/settings" element={<Settings />} />}
                {valid && <Route path="frontend/admin/updateCourse/:id" element={<UpdateCourse />} />}
                {user && <Route path="changePassword" element={<ChangePassword />} />}
                <Route path="forgotpassword" element={<ForgotPassword />} />

              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
