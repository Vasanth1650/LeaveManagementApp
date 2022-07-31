import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchUserData } from '../../Api/AuthenticationService'

import * as BootStrap from 'react-bootstrap'
import Headers from '../Navbar/Headers';


const AddLeave = () => {

    const [receive, setReceive] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [days, setDays] = useState('')
    const [reason1, setReason1] = useState('')
    const [reason2, setReason2] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [data, setData] = useState({});
    const [userid, setUserid] = useState('');
    const [allotedLeave, setAllotedLeave] = useState('')
    const [allotedleave, setAllotedleave] = useState('')
    const usenavigate = useNavigate();
    const [username, setUsername] = useState('')
    const [supervisor, setSupervisor] = useState('')
    const [designation, setDesignation] = useState('')

    React.useEffect(() => {
        fetchUserData().then((response) => {
            setData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (!localStorage.getItem("USER_KEY")) {
            if (!data.username) {
                usenavigate('/')
            }
        }

    }, [data])


    useEffect(()=>{
        setUserid(data.id)
        setUsername(data.username)
        setSupervisor(data.supervisor)
        setAllotedLeave(data.totalleaves)
        setDesignation(data.designation)
    },[data])


    const handleClick = (e) =>{
        e.preventDefault()
        const leaves = {startDate,endDate,userid,username,supervisor,allotedLeave,designation,days,reason1}
        fetch("http://localhost:9090/leave/addLeave",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(leaves)
        }).then((response)=>{
            console.log(response)
            if(response.ok){
                usenavigate('/dashboard')
            }
        }).catch((error)=>{
            console.log(error)
        })
    }



    return (
        <div>
            <Headers />
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">

                        <div className="card-body">
                            <form onSubmit={handleClick}>


                                <div className="form-group">
                                    <label className="form-label"> Start Date :</label>
                                    <input
                                        type="date"
                                        placeholder="Enter StartDate"
                                        name="startDate"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group">
                                    <label className="form-label"> End Date :</label>
                                    <input
                                        type="date"
                                        placeholder="Enter EndDate"
                                        name="endDate"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Days:</label>

                                    <input
                                        type="text"
                                        placeholder="Enter no of days"
                                        name="days"
                                        className="form-control"
                                        value={days}
                                        onChange={(e) => setDays(e.target.value)}
                                    >
                                    </input>
                                </div>








                                <div className="form-group mb-2">
                                    <label className="form-label"> Reason :</label>

                                    <input
                                        type="text"
                                        placeholder="Reason for leave"
                                        name="reason1"
                                        className="form-control"
                                        value={reason1}
                                        onChange={(e) => setReason1(e.target.value)}
                                    >
                                    </input>
                                </div>
















                                <button className="btn btn-success" >Submit </button>
                                <Link to="/leaves" className="btn btn-danger"> Cancel </Link>
                            </form>


                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AddLeave