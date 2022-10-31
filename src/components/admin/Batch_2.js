import React, { useEffect, useState } from "react";
// import Chart from "../chart/Chart";
import { Backend_url } from "../../Config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from '../alert/Alert'
import Loader from "../loader/Loader";

const Batch_2 = ({ batch2,settrigger,trigger }) => {
    const [load, setLoad] = useState(false)
    const [search, setSearch] = useState("");
    const [columns, setColumns] = useState([]);
    const [searchC, setSearchC] = useState([]);
    const [meetingUrl, setMeetingUrl] = useState('')
   
    const [msg, setMsg] = useState('')
    const [trans, setTrans] = useState('')
    const [color, setColor] = useState('')



    const navigate = useNavigate()

  

    const sendingMailToAll = (e) => {
        setLoad(true)
        axios.post(`${Backend_url}/api/group_batch2_mail`, { "message": 
`Hi Batch 2 ,
        
Your meeting update today ${meetingUrl}.  please visit our website or contact administration for any query.
        
Thank you
with Regards,
Administration Team,
SMP Developers        
`,"meeting":meetingUrl })
            .then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`Meeting update sended succesfully.....`)


                setTimeout(() => {
                    setTrans('-100px')
                    settrigger(!trigger)
                    // window.location.reload()
                    setMeetingUrl('')
                    setLoad(false)


                }, 3000)
            }).catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in sending Updation')
                setTimeout(() => {


                    setTrans('-100px')
                    setLoad(false)

                }, 3000)
            })
    }

    const sendPaymentMail = (email,id,payment,name) =>{
        axios.post(`${Backend_url}/api/sending_individual_mail`,
                { "subject":"Your Payment Update","message": 
`
Hi ${name},

Your payment has been updated to ${payment}. To check your payment details, please visit our website or contact administration.

Thank you
with Regards,
Administration Team,
SMP Developers

`,"email":email }
            ).then(res=>{
                setTimeout(() => {
                    setTrans('-100px')
                    // navigate(`viewProfile/${id}`)
                    settrigger(!trigger)
                    setLoad(false)
                }, 3000)
            })
      
    }

    const paymentUpdate = (e,id, email,name) => {
        
        let payment=e.target.previousElementSibling.value
        if(payment===''){
            payment=0
        }

        if (window.confirm(`Do you want to update payment status of ${email} to ${payment}`)) {
            setLoad(true)
            axios.post(`${Backend_url}/api/update_single_payment/${id}`,
                { "paid_amount": payment }
            ).then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`payment for ${email} is updated to ${payment} Successfully.....`)


                sendPaymentMail(email,id,payment,name)
                e.target.previousElementSibling.value=''

            }).catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in payment Updation please reload page')
                setTimeout(() => {


                    setTrans('-100px')
                    settrigger(!trigger)
                    setLoad(false)

                }, 3000)
            })
        }

    }


    useEffect(() => {
        setSearchC([...batch2]);
    }, [batch2]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setSearchC(batch2.filter(c => c.email.toLowerCase().includes(e.target.value.toLowerCase()) || c.id.toString().includes(e.target.value)|| c.role.toLowerCase().includes(e.target.value.toLowerCase())))

    };

    const findSearch = (e) => {
        setSearchC(columns.filter(c => c.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(e.target.value.toLowerCase())))
    }
    const handleCheckboxes = (e) => {
        const ch = document.getElementsByClassName("checkboxes");
        if (e.target.checked) {
            for (let i = 0; i < ch.length; i++) {
                ch[i].checked = true;
            }
        } else {
            for (let i = 0; i < ch.length; i++) {
                ch[i].checked = false;
            }
        }
    };
    return (
        <>
            <Alert msg={msg} trans={trans} color={color} />
            {load === true && <Loader />}
            <div>
                <div className="topNavModi visi">
                    <div >
                        <input
                            type="text"
                            value={meetingUrl}
                            onChange={e => {
                                setMeetingUrl(e.target.value)
                            }}
                            placeholder="update meeting url"
                            style={{ padding: "5px", width: "300px" }}
                        />
                    </div>
                    {meetingUrl !=='' &&   <button onClick={
                        sendingMailToAll
                    }
                        className="sendAll"


                    >Send Mail To All</button>}


                </div>
                <div className="profileAll">
                    <div className="tableContainer">
                    <div  className="invisi">
                            <input
                                type="text"
                                value={meetingUrl}
                                onChange={e => {
                                    setMeetingUrl(e.target.value)
                                }}
                                placeholder="update meeting url"
                                style={{ padding: "5px", width: "250px" }}

                            />
                            {meetingUrl !=='' &&  <i className="fa-solid fa-arrow-up " style={{marginLeft:"10", background:"green",padding:"5px",borderRadius:"50%",color:"white" }}  onClick={sendingMailToAll}></i>
}
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder="search Batch_2 Students By their ID, EMAIL, Role"
                        />
                        {/* <i class="fa-solid fa-magnifying-glass" onClick={findSearch} style={{padding:"5px",paddingBottom:"8px"}}></i> */}
                        {searchC.length>0 ?
                            <div className="bottomOverView">
                            <div className="tables">
                                <TableContainer
                                    component={Paper}
                                    className="table "
                                    style={{
                                        height: "350px",
                                        overflowY: "scroll",
                                    }}
                                >
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table" className="sT">
                                        <TableHead style={{ position: "sticky", top: "0", background: "black" }}>
                                            <TableRow className="t">
                                                {/* <TableCell className="tableCell head">Id</TableCell> */}
                                                <TableCell className="tableCell head vP" style={{ color: "white" }}>ID</TableCell>
                                                <TableCell className="tableCell head visi" style={{ color: "white" }}>Name</TableCell>
                                                <TableCell className="tableCell head visi" style={{ color: "white" }}>Role</TableCell>
                                                <TableCell className="tableCell head vP" style={{ color: "white" }}>Email</TableCell>
                                                <TableCell className="tableCell head visi" style={{ color: "white" }}>Payment paid</TableCell>
                                                <TableCell className="tableCell head visi" style={{ color: "white" }}>Update Payment</TableCell>

                                                <TableCell className="tableCell head visi" style={{ color: "white" }}>View</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {searchC.map((row, index) => (
                                                <>
                                                    <TableRow key={index}>
                                                        {/* <TableCell className="tableCell bo">{row.index}</TableCell> */}

                                                        <TableCell className="tableCell bo vP">
                                                            {row.id}
                                                        </TableCell>

                                                        <TableCell className="tableCell bo visi">
                                                            {row.first_name}
                                                        </TableCell>
                                                        <TableCell className="tableCell bo visi" style={{textTransform:"capitalize"}}>
                                                            {row.role}
                                                        </TableCell>
                                                        <TableCell className="tableCell bo vP">
                                                        <Link to={`viewProfile/${row.id}`}> {row.email}</Link>
                                                        </TableCell>
                                                        <TableCell className="tableCell bo visi">
                                                            {row.paid_amount}
                                                        </TableCell>
                                                        <TableCell className="tableCell bo visi">
                                                        {row.role !=='trainer' && 
                                                            <><input type="number"  />
                                                            
                                                            <button className="" style={{ border: "none", outline: "0", background: "blue", padding: "2px 4px", cursor: "pointer", marginLeft: "5px", color: "white" ,borderRadius: "5px"}}
                                                                onClick={e => {
                                                                    paymentUpdate(e,row.id, row.email,row.first_name)
                                                                }}
                                                            >Update</button></>}
                                                        </TableCell>

                                                        <TableCell className="tableCell bo visi">
                                                            <Link to={`viewProfile/${row.id}`}>View Profile</Link>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                        :
                        <div className="bottomOverView" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"300px"}}>
                            <h1>No Students in Batch_2</h1>
                        </div>
                        
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default Batch_2;
