import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Backend_url, Cloudinary_url } from '../../Config'
import Alert from '../alert/Alert'
import Loader from "../loader/Loader";
import jwtDecode from 'jwt-decode'
const ViewProfile = () => {
    const { id } = useParams()
    const [user, setUser] = useState([])
    const [load, setLoad] = useState(false)
    const [msg, setMsg] = useState('')
    const [trans, setTrans] = useState('')
    const [color, setColor] = useState('')
    const [referal, setReferal] = useState(0)
    const [batch, setBatch] = useState(0)
    const [total, setTotal] = useState(10000)
    const [payment, setPayment] = useState(0)
    const [message, setMessage] = useState('')

    useEffect(() => {
        setLoad(true)
        if (localStorage.getItem('userDetails')) {
          axios.get(`${Backend_url}/api/getting_single_students/${id}`,
          { headers: { 
            "Content-Type": "application/json",
            
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userDetails')).access}`} }
          )
          .then(res=>{
            setLoad(false)
            setUser(res.data)
          })
         
        }
    
      }, [id])





    useEffect(() => {
        setMessage(`Hi ${user.first_name},
        
You have Successfully paid the amount of ${user.paid_amount}, and the remaining balance is ${user.Total - user.paid_amount}. We have updated the same in our records. To check your payment details, please visit our website.

Thank you
with Regards,
Administration Team,
SMP Developers



`)
    }, [user.Total, user.paid_amount, user.first_name])



    const navigate = useNavigate()

    const deleteUser = (e) => {

        if (window.confirm(`Do you really want to delete ${user.email}?`)) {
            setLoad(true)
            axios.get(`${Backend_url}/api/delete_single_student/${user.id}`).then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`User Deleted Successfully.....`)


                setTimeout(() => {
                    setTrans('-100px')


                    navigate('/frontend/admin')


                }, 3000)

            }).catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in  Updation')
                setTimeout(() => {


                    setTrans('-100px')
                    window.location.reload()

                }, 3000)
            })
        }
    }



    const batchUpdateMail = (email, batch) => {
        axios.post(`${Backend_url}/api/sending_individual_mail`,
            { "subject": "Your Batch Update",
 "message": `
 Hi ${user.first_name},

Your batch has been updated to ${batch}. To check your batch details, please visit our website or contact administration

Thank you
with Regards,
Administration Team,
SMP Developers
 
`, "email": email }
        ).then(res => {
            setTimeout(() => {
                setTrans('-100px')
                window.location.reload()
            }, 3000)
        })

    }



    const changeBatch = (email) => {

        if (window.confirm(`Do you want to update batch status of ${user.email} to ${batch}`)) {
            setLoad(true)
            axios.post(`${Backend_url}/api/update_student_batch/${user.id}`,
                { "batch": batch }
            ).then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`Batch for ${user.email} is updated to batch-${batch} Successfully.....`)
                batchUpdateMail(user.email, batch)


            }).catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in Batch Updation')
                setTimeout(() => {


                    setTrans('-100px')
                    window.location.reload()

                }, 3000)
            })
        }

    }


    const sendReferalMail = (email) => {
        axios.post(`${Backend_url}/api/sending_individual_mail`,
            { "subject": "Your Referal Update", 
"message": `
Hi ${user.first_name},

Your referal has been updated to ${referal}. To check your payment details, please visit our website or contact administration

Thank you
with Regards,
Administration Team,
SMP Developers

`, "email": email }
        ).then(res => {
            setTimeout(() => {
                setTrans('-100px')
                window.location.reload()
            }, 3000)
        })

    }

    const updateReferal = (e) => {
        if (window.confirm(`Do you really want to Update ${user.email} referal to ${referal}?`)) {
            setLoad(true)
            axios.post(`${Backend_url}/api/update_single_referals/${user.id}`,
                { "referals": referal }
            ).then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`Referal of ${user.email} updated Successfully to ${referal}..... `)


                sendReferalMail(user.email)

            }).catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in  Updation')
                setTimeout(() => {


                    setTrans('-100px')
                    window.location.reload()

                }, 3000)
            })
        }
    }



    const sendTotalMail = (email) => {
        axios.post(`${Backend_url}/api/sending_individual_mail`,
            { "subject": "Your Total Update", 
"message": `
Hi ${user.first_name},

Your Total Fee  to pay is ${payment}. To check your payment details, please visit our website or contact administration

Thank you
with Regards,
Administration Team,
SMP Developers

`, "email": email }
        ).then(res => {
            setTimeout(() => {
                setTrans('-100px')
                window.location.reload()
            }, 3000)
        })

    }
    const totalUpdate = (e) => {
        if (window.confirm(`Do you really want to Update ${user.email} total to ${total}?`)) {
            setLoad(true)
            axios.post(`${Backend_url}/api/update_single_total/${user.id}`,
                { "total": total }
            ).then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`Total of ${user.email} updated Successfully to ${total}..... `)


                sendTotalMail(user.email)

            }).catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in  Updation')
                setTimeout(() => {


                    setTrans('-100px')
                    window.location.reload()

                }, 3000)
            })
        }
    }



    const sendPaymentMail = (email) => {
        axios.post(`${Backend_url}/api/sending_individual_mail`,
            {
"subject": "Your Payment Update",
"message":`Hi ${user.first_name},

Your payment has been updated to ${payment}. To check your payment details, please visit our website or contact administration

Thank you
with Regards,
Administration Team,
SMP Developers`

                , "email": email
            }
        ).then(res => {
            setTimeout(() => {
                setTrans('-100px')
                window.location.reload()
            }, 3000)
        })

    }

    const paymentUpdate = (e) => {
        if (window.confirm(`Do you really want to Update ${user.email} payment to ${total}?`)) {
            setLoad(true)
            axios.post(`${Backend_url}/api/update_single_payment/${user.id}`,
                { "paid_amount": payment }
            ).then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`Payment of ${user.email} updated Successfully to ${payment}..... `)


                sendPaymentMail(user.email)

            }).catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in  Updation')
                setTimeout(() => {


                    setTrans('-100px')
                    window.location.reload()

                }, 3000)
            })
        }
    }


    const sendMail = (e) => {
        if (window.confirm(`Do you really want to Send email to ${user.email} `)) {
            setLoad(true)
            axios.post(`${Backend_url}/api/sending_individual_mail`,
                { "subject": "Your Payment Details", "message": message, "email": user.email }
            ).then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`Email sent Successfully.....`)


                setTimeout(() => {
                    setTrans('-100px')

                    window.location.reload()


                }, 3000)

            }).catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in  Updation')
                setTimeout(() => {


                    setTrans('-100px')
                    window.location.reload()

                }, 3000)
            })
        }

    }

    return (
        <>
            <Alert msg={msg} trans={trans} color={color} />
            {load === true && <Loader />}
            <div className='profileContainer'>
                <div className='top'>
                    <div className="leftTop">
                        <img src={`${Cloudinary_url}/${user.image}`} width={150} height={150} alt="" />
                    </div>
                    <div className="rightTop">
                        <div><a href={`mailto:${user.email}`}><span className='email'>{user.email}</span></a></div>
                        <div className='study'>

                            <div><span>{user.year_of_graduation}</span></div>
                            <div><span>{user.college}</span></div>
                            <div><span>{user.role}</span></div>
                        </div>
                        <div><span className='name'>{user.first_name}</span></div>
                        <div><a href={`${user.social_media}`}><span>{user.social_media}</span></a></div>
                        <div><span>{user.mobile}</span></div>




                    </div>
                    <div className="rightMost">
                        {user.batch === '0' ? <div ><span className='email' style={{ color: "red" }}>Batch not alloted</span></div> : <div><span className='email'>Batch-{user.batch}</span></div>}

                        <div style={{ marginTop: "20px" }}>
                            <div className='individualDetails'>
                                <div><label>Total Course Fee:</label></div>
                                <span style={{ color: "green" }}>{user.Total}</span>
                            </div>
                            <div className='individualDetails'>
                                <div><label>Total amount paid:</label></div>
                                <span style={{ color: "green" }}>{user.paid_amount}</span>
                            </div>
                            <div className='individualDetails'>
                                <div><label>Balance Amount:</label></div>
                                <span style={{ color: "red" }}>{user.Total - user.paid_amount}</span>
                            </div>
                            <div className='individualDetails'>
                                <div style={{ color: "green" }}><label>Total Referals Made: </label></div>
                                <span>{user.referals}</span>
                            </div>
                            <div className='individualDetails'>
                                <div><label>Amount after reduction: </label></div>
                                <span style={{ color: "green" }}>{user.Total}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {user.role === 'student' ?
                    <div className='bottom'>
                        <div className='leftBottom'>
                            <div>
                                <label>To Update <span style={{ color: "green" }}>Referals</span> made by user: </label>
                                <select onChange={e => setReferal(e.target.value)}>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                </select>
                                <button className='update' onClick={updateReferal}>Update</button>
                            </div>
                            <div>
                                <label>To Update <span style={{ color: "green" }}>Total</span> amount of the user: </label>
                                <select onChange={e => setTotal(e.target.value)}>
                                    <option value={7000}>7000</option>
                                    <option value={8000}>8000</option>
                                    <option value={9000}>9000</option>
                                    <option value={10000} selected>10000</option>
                                    <option value={15000}>15000</option>

                                </select>
                                <button className='update' onClick={totalUpdate}>Update</button>
                            </div>
                            <div>
                                <label>To Update <span style={{ color: "green" }}>Payment</span> made by user: </label>
                                <select onChange={e => setPayment(e.target.value)}>
                                    <option value={0}>0</option>
                                    <option value={2500}>2500</option>
                                    <option value={5000}>5000</option>
                                    <option value={10000}>8000</option>
                                    <option value={15000}>9000</option>


                                </select>
                                <button className='update' onClick={paymentUpdate}>Update</button>
                            </div>
                            <div>
                                <label>To Update <span style={{ color: "green" }}>Batch</span> of this user: </label>
                                <select onChange={e => setBatch(e.target.value)}>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>



                                </select>
                                <button className='update' onClick={changeBatch}>Update</button>
                            </div>
                            <div>
                                <label>To Delete  {user.email} permanantly:</label>
                                <button className='danger' onClick={deleteUser}>Delete </button>
                            </div>
                        </div>
                        <div className='rightBottom'>
                            <textarea rows={10} cols={50} value={message} onChange={e => { setMessage(e.target.value) }}></textarea>
                            <button className='update' onClick={sendMail} style={{ display: "block" }}>Send mail</button>
                        </div>
                    </div>
                    :
                    <div className='bottom'>
                        <div className='leftBottom'>
                            <div>
                                <label>To Update <span style={{ color: "green" }}>Batch</span> of this Trainer: </label>
                                <select onChange={e => setBatch(e.target.value)}>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>



                                </select>
                                <button className='update' onClick={changeBatch}>Update</button>
                            </div>
                            <div>
                                <label>To Delete  {user.email} permanantly:</label>
                                <button className='danger' onClick={deleteUser}>Delete </button>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default ViewProfile