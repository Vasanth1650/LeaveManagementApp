import React, { useEffect, useState } from 'react'
import { fetchUserData } from '../../Api/AuthenticationService'
import Headers from '../Navbar/Headers'
import ApproveService from './Service/ApproveService'
import * as BootStrap from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Approve() {
    const [data, setData] = useState('')
    const [leaves, setLeaves] = useState([])
    const usenavigate = useNavigate()

    React.useEffect(() => {
        fetchUserData().then((response) => {
            setData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (data.roleCode === "ADMIN") {
            getterForAdmin()
        } else {
            getBySuperior(data.email)
        }
    }, [data])

    const getterForAdmin = () => {
        ApproveService.getAllRequest().then((response) => {
            setLeaves(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getBySuperior = () => {
        ApproveService.getBySuperVisor(data.email).then((response) => {
            setLeaves(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }


    function review(id, status) {
        if (status === "Approved" && data.roleCode === "MANAGER") {
            alert("Sorry This Request Has Been FullFilled This Can Only Accessed My Admin Now")
        } else {
            usenavigate('/reviewrequest/' + id)
        }

    }


    return (
        <div>
            <Headers />

            <br /><br />
            <div>
                <BootStrap.Row xs={1} md={4} >
                    {
                        leaves.map(leaves =>
                            <BootStrap.Col>
                                <div>
                                    <BootStrap.CardGroup>
                                        <BootStrap.Card>
                                            <BootStrap.Card.Body>
                                                <BootStrap.Card.Text>
                                                    StartDate :  {leaves.startDate}
                                                </BootStrap.Card.Text>
                                                <BootStrap.Card.Text>EndDate :  {leaves.endDate}</BootStrap.Card.Text>
                                                <BootStrap.Card.Text>Status :  {leaves.status}
                                                </BootStrap.Card.Text>
                                                <BootStrap.Card.Text>Reason :  {leaves.reason1}
                                                </BootStrap.Card.Text>
                                                <BootStrap.Card.Text>Supervisor :  {leaves.supervisor}
                                                </BootStrap.Card.Text>
                                            </BootStrap.Card.Body>
                                            <BootStrap.Button onClick={() => review(leaves.leaverequestid, leaves.status)}>
                                                View Request
                                            </BootStrap.Button>

                                            <br/>

                                            {data.roleCode==="MANAGER" && leaves.status === "Approved" &&
                                                <BootStrap.Button>Help</BootStrap.Button>
                                            }

                                            <br/>

                                            {data.roleCode==="MANAGER" && leaves.status === "Rejected" &&
                                                <BootStrap.Button>Help</BootStrap.Button>
                                            }

                                            


                                        </BootStrap.Card>
                                    </BootStrap.CardGroup>

                                </div>
                            </BootStrap.Col>

                        )
                    }
                </BootStrap.Row>
            </div>

        </div>
    )
}

export default Approve