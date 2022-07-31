import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Headers from '../../Navbar/Headers'
import ApproveService from '../Service/ApproveService'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import * as BootStrap from 'react-bootstrap'
import { fetchUserData } from '../../../Api/AuthenticationService';

function Review() {
    const [data,setData] = useState({})
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [days, setDays] = useState('')
    const [reason1, setReason1] = useState('')
    const [reason2, setReason2] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [userid, setUserid] = useState('');
    const [allotedLeave, setAllotedLeave] = useState('')
    const usenavigate = useNavigate();
    const { id } = useParams();
    const [username, setUsername] = useState('')
    const [supervisor, setSupervisor] = useState('')
    const [designation, setDesignation] = useState('')
    const [double,setDouble] = useState('')

    console.log(double)

    useEffect(() => {
        getRequestsCheck(id)
    }, [])

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setData(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    console.log(double)

    const UpdateProvider = () => {
        
        const leaves = { startDate, endDate, days, reason1, reason2, type, status, userid, username, allotedLeave, supervisor, designation }
        
        if(double==="Hello" && status==="Approved"){
        ApproveService.updateRequest(id, leaves).then((response) => {
            console.log(response)
            usenavigate('/approvallist')
        }).catch((error) => {
            console.log(error)
        })
        }else{
            alert("Hey")
        }
    }

    

    const defsaee = () =>{
        if(status==="Approved" && double===""){
            setAllotedLeave(allotedLeave-days)
            setDouble("Hello")
        }
    }
    
    
   


    const getRequestsCheck = () => {
        ApproveService.getByIds(id).then((response) => {
            setStartDate(response.data.startDate)
            setEndDate(response.data.endDate)
            setAllotedLeave(response.data.allotedLeave)
            setDesignation(response.data.designation)
            setDays(response.data.days)
            setStatus(response.data.status)
            setUserid(response.data.userid)
            setUsername(response.data.username)
            setReason1(response.data.reason1)
            setReason2(response.data.reason2)
            setType(response.data.type)
            setSupervisor(response.data.supervisor)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <Headers />

            

            <div className='alldetailscard'>
                <Card style={{ width: '28rem' }}>
                    <Card.Body>
                        <Card.Title style={{ color: "red" }}>Your Email :  {username}</Card.Title>
                        <br /><br />


                        <Card.Text style={{ color: "red" }}>Leave Start Date :
                        </Card.Text>
                        <Card.Text>{startDate}</Card.Text>


                        <Card.Text style={{ color: "red" }}>Leave End Date :
                        </Card.Text>
                        <Card.Text>{endDate}</Card.Text>

                        <Card.Text style={{ color: "red" }}>Total Leave Days :
                        </Card.Text>
                        <Card.Text>{days}</Card.Text>


                        <Card.Text style={{ color: "red" }}>Leave Reason :
                        </Card.Text>

                        <Card.Text>{reason1}</Card.Text>

                        <Card.Text style={{ color: "red" }}>Supervisor :
                        </Card.Text>
                        <Card.Text>{supervisor}</Card.Text>

                        
                        <Card.Text style={{ color: "red" }}>Status Of Request :
                        </Card.Text>
                        <div class="group" onChange={(e) => setStatus(e.target.value)} >

                            <BootStrap.Form.Group className="mb-3" required>

                                <BootStrap.Form.Select value={status} id='status' name='status'
                                >
                                    <option></option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                    <option>Pending</option>


                                </BootStrap.Form.Select>
                            </BootStrap.Form.Group>

                        </div>
                        

                        <Card.Text style={{ color: "red" }}>Leave Type :
                        </Card.Text>
                        <div class="group" onChange={(e) => setType(e.target.value)} >

                            <BootStrap.Form.Group className="mb-3" required>

                                <BootStrap.Form.Select id='type' value={type} name='type'
                                >
                                    <option></option>
                                    <option>Loss Of Pay</option>
                                    <option>Paid Leave</option>
                                    <option>Sick Leave</option>


                                </BootStrap.Form.Select>
                            </BootStrap.Form.Group>

                        </div>

                       


                        <Card.Text style={{ color: "red" }}>Allotedleave :</Card.Text>
                        
                        <Card.Text>{allotedLeave}</Card.Text>

                        {data && data.roles && data.roles.filter(value => value.roleCode === "ADMIN").length &&
                            <input  onChange={(e) => setAllotedLeave(e.target.value)} placeholder="Edit Allocated Leave"/>}
                        


                       
                        <Card.Text style={{ color: "red" }}>Suggestion By Supervisor :
                        </Card.Text>
                        <input value={reason2} onChange={(e) => setReason2(e.target.value)} placeholder='Suggestion'></input>
                        
                        <br/><br/>
                        {status==="Approved" &&
                        <Button onClick={defsaee}>Detect</Button>}
                        <br/><br/>
                        <Button variant="danger" onClick={UpdateProvider}>Send Response</Button>


                    </Card.Body>
                </Card>
            </div>


        </div>
    )
}

export default Review