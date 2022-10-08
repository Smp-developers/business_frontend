import React, { useEffect, useState } from 'react'
import { Backend_url } from '../../../Config'
import axios from 'axios'
import Trainee_list from './Trainee_list'

import UploadTrainee from './UploadTrainee'

const Trainee = () => {
  const [contentVal, setContentVal] = useState('trainee_list')
  useEffect(() => {

  }, [])


  const [trainees, setTrainees] = useState([])
  useEffect(() => {
    axios.get(`${Backend_url}/api/get_all_trainees`).then((res) => {
      setTrainees(res.data)
      
    })
  }, [])

  return (
    <div className='traineeContainer'>
      <div className='topTrainee'><div className="addTrainee">
        <div>
          <i className="fa-solid fa-plus"  onClick={e => { setContentVal('add') }}></i>
          <span>Add Trainee</span>
        </div>

      </div>
        <div>

          <ul><li className={contentVal==='trainee_list'&&'active'} onClick={e => { setContentVal('trainee_list') }}>Trainee List</li></ul>
        </div></div>
      <div className="contents">
        {contentVal === 'trainee_list' && <Trainee_list trainees={trainees} />}
        {contentVal === 'add' && <UploadTrainee />}
      </div>
    </div>
  )
}

export default Trainee