import React from 'react'
import './alert.scss'
const Alert = ({msg,trans,color}) => {
  return (
    <div className='alertContainer' style={{transform:`translateY(${trans})`,background:`${color}`}}>
        <div className='alert' style={{color:"white"}} >
            {msg}
            
        </div>
        <div><div className='progressing'></div></div>
    </div>
  )
}

export default Alert