import React, { useState } from 'react'
import { Backend_url, Cloudinary_url } from '../../Config'
import Loader from '../loader/Loader'
import Alert from '../alert/Alert'
import axios from 'axios'
import { useNavigate } from 'react-router'

const ProfileStudent = ({ updatedUserDetails }) => {
  const [load, setLoad] = useState(false)
  const [msg, setMsg] = useState('')
  const [trans, setTrans] = useState('')
  const [color, setColor] = useState('')
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const navigate = useNavigate()

  const sendMail = (e) => {
    setLoad(true)
    axios.post(`${Backend_url}/api/sending_individual_mail`, {
      "subject": subject, "message": message + ` my email is ${updatedUserDetails.email} and id is ${updatedUserDetails.id}`, "email": "smpdevelopers.official@gmail.com"
    }).then(res => {
      setColor("green")
      setTrans('0px')
      setMsg(`${subject} request sent successfully.......`)


      setTimeout(() => {
        setLoad(false)
        setTrans('-100px')
        setLoad(false)
        window.location.reload()



      }, 3000)
    }).catch(err => {
      setColor("red")
      setTrans('0px')
      setMsg('Error in sending request mail')

      setTimeout(() => {


        setTrans('-100px')
        setLoad(false)

      }, 3000)
    })
  }



  const handleRequest = (e) => {
    setLoad(true)
    axios.post(`${Backend_url}/api/sending_individual_mail`, {
      "subject": "Batch updation sent by user", "message": `            
Hi Admin,

Mr/Mrs ${updatedUserDetails.email} has been made a request to add him/her his id is ${updatedUserDetails.id} and he paid amount ${updatedUserDetails.paid_amount}. Please verify him and add them.
                        
Thank you
with Regards,
Administration Team,
SMP Developers
`, "email": "smpdevelopers.official@gmail.com"
    }).then(res => {
      setColor("green")
      setTrans('0px')
      setMsg(`Batch update request sent successfully.......`)


      setTimeout(() => {
        setLoad(false)
        setTrans('-100px')
        setLoad(false)
        window.location.reload()



      }, 3000)
    }).catch(err => {
      setColor("red")
      setTrans('0px')
      setMsg('Error in sending batch request mail')

      setTimeout(() => {


        setTrans('-100px')
        setLoad(false)

      }, 3000)
    })
  }


  const changeBatchRequest = (e) => {
    axios.get(`${Backend_url}/api/batch_request_update/${updatedUserDetails.id}`).then(res => {
      handleRequest()
    }).catch(err => {
      setColor("red")
      setTrans('0px')
      setMsg('Error in Updation')

      setTimeout(() => {


        setTrans('-100px')
        setLoad(false)

      }, 3000)
    })
  }


  return (
    <>
      <div> <Alert msg={msg} trans={trans} color={color} />
        {load === true && <Loader />}</div>
      <div className='profileStudentContainer'>
        <div className='topProfile'>
          <div className='leftTop'>
            <div>
              <img className='image' src={`${Cloudinary_url}/${updatedUserDetails.image}`} style={{ borderRadius: "50%" }} width={120} height={120} alt="" />
            </div>
            <div>
              <span className='name'>{updatedUserDetails.first_name}</span>
              <span>{updatedUserDetails.email}</span>

            </div>
          </div>
          <div className='rightTop'>
            <div>
              {updatedUserDetails.batch !== '0' && updatedUserDetails.batch !== '' ?
                <span style={{marginLeft:"35px"}}>Batch-{updatedUserDetails.batch}</span> :
                (updatedUserDetails.batch_request === 'not' && updatedUserDetails.batch !== '' ? <button onClick={changeBatchRequest} style={{ marginTop: "3px" }}>Request for batch</button> : <button disable style={{ cursor: "not-allowed", marginTop: "3px" }}>Request has been sent</button>)
              }
            </div>
            

          </div>

        </div>
        <div className='middleProfile'>
          <div className='leftMiddle'>
            <div className='experience'>
              <span>Experience</span>
              <span>I have {updatedUserDetails.experience_in_python} technical field experience</span>
            </div>
            <div className='about'>
              <span>About Me</span>
              <span>Im {updatedUserDetails.first_name}.Im from {updatedUserDetails.college}. My mobile number is {updatedUserDetails.mobile}. My email id is {updatedUserDetails.email}</span>
            </div>
          </div>
          <div className='rightMiddle'>

            <div className='cashContainer'>

              <div className='cash'>
                <span>Total Fee</span>
                <span>{updatedUserDetails.Total}</span>
              </div>
              <div className='cash'>
                <span>Paid</span>
                <span>{updatedUserDetails.paid_amount}</span>
              </div>
              <div className='cash'>
                <span>Referals</span>
                <span>{updatedUserDetails.referals}</span>
              </div>
              <div className='cash'>
                <span style={{ color: "red" }}>Balance</span>
                <span>{updatedUserDetails.Total - updatedUserDetails.paid_amount}</span>
              </div>
            </div>
            <div className='emailContainer'>
              <div> <input type="text" onChange={e => setSubject(e.target.value)} placeholder="Subject..." /></div>
              <div><textarea rows={10} cols={30} placeholder="Enter Message to admin...." value={message} onChange={e => { setMessage(e.target.value) }}></textarea></div>
              <div >
                {(subject !== "" && message !== "") ?

                  <button className='update' onClick={sendMail} style={{ display: "block" }}>Send mail</button>
                  :
                  <button className='update' disabled style={{ cursor: "not-allowed" }}>Send mail</button>

                }


              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default ProfileStudent