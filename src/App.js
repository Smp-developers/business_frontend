import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from '../src/components/sidebar/Sidebar'
import Home from "./pages/Validation_home/Home";
import './App.css'
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
const App = () => {
  const [valid, setValid] = useState(false)
 const [user,setUser] = useState(false)
  

  useEffect(() => {
   if(localStorage.getItem('userDetails')){
    setUser(true)
    if (JSON.parse(localStorage.getItem('userDetails')).is_superuser) {
      setValid(true)
    }
   
   }
  },[])


  return (
    <div>
      <BrowserRouter>
      
        <div className="home">
          <Sidebar />
          <div className="homeContainer" >
          <AltSidebar />

            <div style={{ padding: "10px" }} className="routeContainer">
              <Routes>
                <Route index element={<Home />} />
                {!user && <Route path="login" element={<Login />} />}
                {!user && <Route path="signup" element={<Signup />} />}
                
                {user &&<Route path="candidature" element={<StudentCandidature />} />}
                {user &&<Route path="common/settings" element={<StudentSettings />} />}
                {user &&  <Route path="edit" element={<EditStudent />} />}
                {valid &&<Route path="frontend/editAdmin" element={<EditAdmin />} />}
                {valid && <Route path="frontend/admin" element={<Admin />} />}
                {valid &&<Route path="frontend/admin/viewProfile/:id" element={<ViewProfile />} />}
                {valid &&<Route path="frontend/admin/settings" element={<Settings />} />}
                {valid &&<Route path="frontend/admin/updateCourse/:id" element={<UpdateCourse />} />}
                {user &&<Route path="changePassword" element={<ChangePassword />} />}
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
