import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../../Api/AuthenticationService';
import Headers from '../Navbar/Headers';
import ViewService from './Service/ViewService';
import * as BootStrap from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function ViewLeave() {
    const [data, setData] = useState({})
    const [leaves, setLeaves] = useState([])
    const usenavigate = useNavigate()




    useEffect(() => {
        getAllLeaves(data.id)
    }, [data])



    const getAllLeaves = () => {
        ViewService.getByUserId(data.id).then((response) => {
            setLeaves(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }



    React.useEffect(() => {
        fetchUserData().then((response) => {
            setData(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    function viewleave(id){
        usenavigate('/viewrequest/'+id)
    }


    return (
        <div>
            <Headers />

            <br /><br />
            <div className=''>

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
                                                </BootStrap.Card.Body>
                                                <BootStrap.Button onClick={() => viewleave(leaves.leaverequestid)}>
                                                    View
                                                </BootStrap.Button>
                                              
                                                
                                                

                                            </BootStrap.Card>
                                        </BootStrap.CardGroup>
                                       
                                    </div>
                                </BootStrap.Col>

                            )
                        }
                    </BootStrap.Row>


            </div>
        </div>
    );
}

export default ViewLeave;