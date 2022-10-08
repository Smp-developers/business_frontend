import axios from 'axios'
import React, { useState } from 'react'
import Alert from '../../alert/Alert'
import { Backend_url } from '../../../Config'
import Loader from '../../loader/Loader'
const UploadTrainee = ({ setContentVal }) => {

    const [image, setImage] = useState('')
    const [name, setName] = useState('')

    const [designation, setDesignation] = useState('')
    const [company, setCompany] = useState('')
    const [mobile, setMobile] = useState('')
    const [batch, setBatch] = useState('')
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')
    const [trans, setTrans] = useState('')
    const [color, setColor] = useState('')

    const [load, setLoad] = useState(false)

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }




    const sendMailToTrainee = (e) => {
        axios.post(`${Backend_url}/api/sending_individual_mail`, {
            "subject": "Your credentials", "message": `
Dear Trainer ${name}, 

we have added you in SMP site your login credentials will be  ${email}, password: Trainer@1 and batch alloted to you is ${batch}, please login and change your password .

Thank you
with Regards,
Administration Team,
SMP Developers
`

, "email": email
        }).then(res => {
            setTimeout(() => {
                setTrans('-100px')
                setImage('')
                setName('')
                setEmail('')
                setDesignation('')
                setBatch('')
                setMobile('')
                setLoad(false)



            }, 3000)
        })
    }



    const uploadCourse = (e) => {
        setLoad(true)
        axios.post(`${Backend_url}/api/upload_trainee`,
            { 'image': image, 'name': name, 'skills': designation, 'batch': batch, 'email': email, 'company': company, 'mobile': mobile },
            { headers: { "Content-Type": "multipart/form-data" } }

        ).then(res => {

            setColor("green")
            setTrans('0px')
            setMsg(`${name} Trainee has been added successfully`)
            sendMailToTrainee()


        })
            .catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in uploading trainee')
                setTimeout(() => {

                    setLoad(false)
                    setTrans('-100px')


                }, 3000)
            })
    }
    return (
        <>
            <Alert msg={msg} trans={trans} color={color} />
            {load === true && <Loader />}
            <div className='course'>
                <div style={{ paddingLeft: "140px" }}>
                    Add Trainee Image
                    <input type="file"  style={{ width: "300px" }} onChange={handleImage} />
                </div>
                <div>
                    <input type="text" value={name} style={{ width: "300px" }} onChange={e => { setName(e.target.value) }} placeholder="Add trainee name" />
                </div>
                <div>
                    <input type="text" style={{ width: "300px" }} onChange={e => { setEmail(e.target.value) }} value={email} placeholder="Add trainee email" />
                </div>
                <div>
                    <input type="text" style={{ width: "300px" }} onChange={e => { setCompany(e.target.value) }} value={company} placeholder="Add Company" />
                </div>
                <div>
                    <input type="text" style={{ width: "300px" }} onChange={e => { setDesignation(e.target.value) }} value={designation} placeholder="Add Skills" />
                </div>
                <div>
                    <input type="text" style={{ width: "300px" }} onChange={e => { setMobile(e.target.value) }} value={mobile} placeholder="Add Mobile" />
                </div>
                <div>
                    <label>Batch for teaching</label>
                    <select style={{ width: "180px", marginLeft: "12px" }} value={batch} onChange={e => { setBatch(e.target.value) }} >
                        <option>select</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                    </select>
                </div>


                {(image !== '' && designation !== '' && batch !== "" && name !== '' && company !== '' && mobile !== '' && email !== '')
                    &&
                    (<button onClick={uploadCourse} className='' style={{ float: "right", background: "orange", color: "white", border: "none", outline: "0", cursor: "pointer" }}><i className="fa-solid fa-right-to-bracket" style={{ marginRight: "5px" }}></i><span>Upload</span></button>)

                }
                {
                    (image === '' || designation === '' || email === "" || name === '' || company === '' || mobile === '' || batch === '')
                    &&
                    <button className='sendIn disable' style={{ float: "right" }}><i className="fa-solid fa-right-to-bracket"></i><span>Upload</span></button>
                }
            </div>
        </>
    )
}

export default UploadTrainee