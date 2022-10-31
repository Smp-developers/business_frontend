import React, { useEffect, useState } from 'react'
import { Backend_url } from '../../../Config'
import axios from 'axios'
import Trainee_list from './Trainee_list'

import UploadTrainee from './UploadTrainee'
import Loader from '../../loader/Loader'

const Trainee = ({trainees,settrigger,trigger}) => {
  const [contentVal, setContentVal] = useState('trainee_list')
  useEffect(() => {

  }, [])

  const [load,setLoad] = useState(false)

  

  return (
    <div className='traineeContainer'>
    {load===true && <Loader />}
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
        {contentVal === 'add' && <UploadTrainee settrigger={settrigger} trigger={trigger} setContentVal={setContentVal}/>}
      </div>
    </div>
  )
}

export default Trainee