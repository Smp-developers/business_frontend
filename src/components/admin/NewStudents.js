import React, { useEffect, useState } from "react";
// import Chart from "../chart/Chart";
import { Backend_url } from "../../Config";
import axios from "axios";
import { Link } from "react-router-dom";
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

const OverAll = ({ }) => {
    const [search, setSearch] = useState("");
    const [columns, setColumns] = useState([]);
    const [searchC, setSearchC] = useState([]);
    const [meetingUrl, setMeetingUrl] = useState('')
    const [batch, setBatch] = useState(0)
    const [msg, setMsg] = useState('')

    const [trans, setTrans] = useState('')
    const [color, setColor] = useState('')
    const [load, setLoad] = useState(false)


    const [newStudents, setNewStudents] = useState([])
    useEffect(() => {
        setLoad(true)
        axios.get(`${Backend_url}/api/get_none_batches/`).then((res) => {
            setLoad(false)
            setNewStudents(res.data)
        })
    }, [])



    const sendingMailToAll = (e) => {
        setLoad(true)
        axios.post(`${Backend_url}/api/sending_newStudents_mail`, {
            "message":
                `Hi New students ,

Your meeting update today ${meetingUrl}.  please visit our website or contact administration for any query.

Thank you
with Regards,
Administration Team,
SMP Developers
` , "meeting": meetingUrl
        })
            .then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`Meeting update sended succesfully.....`)


                setTimeout(() => {
                    setTrans('-100px')
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


    const sendPaymentMail = (email, payment, name) => {
        axios.post(`${Backend_url}/api/sending_individual_mail`,
            {
                "subject": "Your Payment Update",
                "message": `
Hi ${name},

Your payment has been updated to ${payment}. To check your payment details, please visit our website or contact administration.

Thank you
with Regards,
Administration Team,
SMP Developers

`, "email": email
            }
        ).then(res => {
            setTimeout(() => {
                setTrans('-100px')
                window.location.reload()
            }, 3000)
        })

    }
    const paymentUpdate = (e, id, email, name) => {
        let payment = e.target.previousElementSibling.value
        if (payment === '') {
            payment = 0
        }
        if (window.confirm(`Do you want to update payment status of ${email} to ${payment}`)) {
            setLoad(true)
            axios.post(`${Backend_url}/api/update_single_payment/${id}`,
                { "paid_amount": payment }
            ).then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`payment for ${email} is updated to ${payment} Successfully.....`)


                sendPaymentMail(email, payment, name)
            }).catch(err => {
                setColor("red")
                setTrans('0px')
                setMsg('Error in payment Updation')
                setTimeout(() => {


                    setTrans('-100px')
                    window.location.reload()

                }, 3000)
            })
        }

    }

    const batchUpdateMail = (email, batch, name) => {
        axios.post(`${Backend_url}/api/sending_individual_mail`,
            {
                "subject": "Your Batch Update", "message":
                    `Hi ${name},

Your batch has been updated to ${batch}. To check your batch details, please visit our website or contact administration.

Thank you
with Regards,
Administration Team,
SMP Developers

`, "email": email
            }
        ).then(res => {
            setTimeout(() => {
                setTrans('-100px')
                window.location.reload()
            }, 3000)
        })

    }



    const batchUpdate = (e, id, email, name) => {
        let batchU = e.target.previousElementSibling.value
        if (batchU === '') {
            batchU = 0
        }
        if (window.confirm(`Do you want to update batch status of ${email} to ${batchU}`)) {
            setLoad(true)
            axios.post(`${Backend_url}/api/update_student_batch/${id}`,
                { "batch": batchU }
            ).then(res => {
                setColor("green")
                setTrans('0px')
                setMsg(`Batch for ${email} is updated to batch-${batchU} Successfully.....`)
                batchUpdateMail(email, batchU, name)


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


    useEffect(() => {
        setSearchC([...newStudents]);
    }, [newStudents]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setSearchC(newStudents.filter(c => c.email.toLowerCase().includes(e.target.value.toLowerCase()) || c.id.toString().includes(e.target.value)))
    };

    const findSearch = (e) => {
        setSearchC(columns.filter(c => c.toLowerCase().includes(search.toLowerCase())))
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
                <div className="topNavModi">
                    <div>
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

                    <button onClick={
                        sendingMailToAll
                    }
                        className="sendAll"


                    >Send Mail To All</button>


                </div>
                <div className="profileAll">
                    <div className="tableContainer">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder="search New Students By their ID,EMAIL"
                        />
                        {/* <i class="fa-solid fa-magnifying-glass" onClick={findSearch} style={{padding:"5px",paddingBottom:"8px"}}></i> */}
                        {searchC.length > 0 ?
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
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead style={{ position: "sticky", top: "0", background: "black" }}>
                                                <TableRow className="t">
                                                    {/* <TableCell className="tableCell head">Id</TableCell> */}
                                                    <TableCell className="tableCell head" style={{ color: "white" }}>ID</TableCell>
                                                    <TableCell className="tableCell head" style={{ color: "white" }}>Name</TableCell>
                                                    <TableCell className="tableCell head" style={{ color: "white" }}>Email</TableCell>
                                                    <TableCell className="tableCell head" style={{ color: "white" }}>Payment paid</TableCell>
                                                    <TableCell className="tableCell head" style={{ color: "white" }}>Update Payment</TableCell>
                                                    <TableCell className="tableCell head" style={{ color: "white" }}>Update Batch</TableCell>

                                                    <TableCell className="tableCell head" style={{ color: "white" }}>View</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {searchC.map((row, index) => (
                                                    <>
                                                        <TableRow key={index}>
                                                            {/* <TableCell className="tableCell bo">{row.index}</TableCell> */}

                                                            <TableCell className="tableCell bo">
                                                                {row.id}
                                                            </TableCell>

                                                            <TableCell className="tableCell bo">
                                                                {row.first_name}
                                                            </TableCell>
                                                            <TableCell className="tableCell bo">
                                                                {row.email}
                                                            </TableCell>
                                                            <TableCell className="tableCell bo">
                                                                {row.paid_amount}
                                                            </TableCell>
                                                            <TableCell className="tableCell bo">
                                                                <input type="number" />

                                                                <button className="" style={{ border: "none", outline: "0", background: "blue", padding: "2px 4px", cursor: "pointer", marginLeft: "5px", color: "white", borderRadius: "5px" }}
                                                                    onClick={e => {
                                                                        paymentUpdate(e, row.id, row.email, row.first_name)
                                                                    }}
                                                                >Update</button>
                                                            </TableCell>
                                                            <TableCell className="tableCell bo">
                                                                <select>
                                                                    <option value={0}>Select</option>
                                                                    <option value={1}>1</option>
                                                                    <option value={2}>2</option>

                                                                </select>
                                                                <button className="" style={{ border: "none", outline: "0", background: "blue", padding: "2px 4px", cursor: "pointer", marginLeft: "5px", color: "white", borderRadius: "5px" }}
                                                                    onClick={e => {
                                                                        batchUpdate(e, row.id, row.email, row.first_name)
                                                                    }}
                                                                >Update</button>
                                                            </TableCell>

                                                            <TableCell className="tableCell bo">
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
                            <div className="bottomOverView" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                                <h1>No New students</h1>
                            </div>

                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default OverAll;
