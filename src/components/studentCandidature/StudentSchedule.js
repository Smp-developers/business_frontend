import React from 'react'

import { Backend_url, Cloudinary_url } from '../../Config'

const StudentSchedule = ({ updatedUserDetails, batchTrainers }) => {


  return (
    <div className='scheduleContainer'>
    { updatedUserDetails.meeting_url===undefined &&   <div className='noUp'>
          <span>Your meeting is updating please wait....</span>
        </div>}
      {updatedUserDetails.meeting_url !== ""  && updatedUserDetails.meeting_url!==undefined
        ?
        <>
          <div className='up'>
            <span>Hi<span style={{fontWeight:"600"}}> {updatedUserDetails.first_name}</span>, This is Your Admin
              today your meeting update is <a href={updatedUserDetails.meeting_url}>{updatedUserDetails.meeting_url}</a>
              . Join here at sharp 7:00 pm.
            </span>
          </div>
          <div className='teaching' style={{marginTop:"10px"}}>
            {batchTrainers.length>0 && <span  style={{fontWeight:"600",textAlign:"center",borderBottom:"2px solid #161b22"}}>Your teaching staff will be</span>}
            <div style={{ padding: "20px", display: "flex", gap: "30px", flexWrap: "wrap" }}>
              {
                batchTrainers.map((c, index) => (
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
          </div>
        </>
        :
        updatedUserDetails.meeting_url==="" &&  <div className='noUp'>
          <span>There is no meeting Updates for now.</span>
        </div> }
       

      


    </div>

  )
}

export default StudentSchedule