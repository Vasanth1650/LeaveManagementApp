import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ViewService from '../Service/ViewService'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Styles/Styles.css'
import Headers from '../../Navbar/Headers';

function AllDetails() {
    const { id } = useParams()
    const [leaves, setLeaves] = useState('')
    const usenavigate = useNavigate()

    useEffect(() => {
        getLeaveById(id)
    }, [])

    const getLeaveById = () => {
        ViewService.getByIds(id).then((response) => {
            setLeaves(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    function deleteThisRequest(id,status){
        if(status===""){
            if(id){
                const checker = window.confirm("Confirm To Remove This Leave Request")
                if(checker){
                    ViewService.deleteById(id).then((response)=>{
                        usenavigate('/leaves')
                    })
                }
            }
        }else{
            alert("The Request Has Been Answered You Cannot Remove This Request")
        }
        
        
    }

    return (
        <div>
            <Headers/>
            <div className='alldetailscard'>
                <Card style={{ width: '28rem' }}>
                    <Card.Body>
                        <Card.Title style={{color:"red"}}>Your Email :  {leaves.username}</Card.Title>
                        <br/><br/>                


                        <Card.Text style={{color:"red"}}>Leave Start Date : 
                        </Card.Text>
                        <Card.Text>{leaves.startDate}</Card.Text>
                        <Card.Text style={{color:"red"}}>Leave End Date :  
                        </Card.Text>


                        <Card.Text>{leaves.endDate}</Card.Text>
                        <Card.Text style={{color:"red"}}>Total Leave Days :  
                        </Card.Text>


                        <Card.Text>{leaves.days}</Card.Text>
                        <Card.Text style={{color:"red"}}>Leave Reason : 
                        </Card.Text>


                        <Card.Text>{leaves.reason1}</Card.Text>
                        <Card.Text style={{color:"red"}}>Suggestion By Supervisor :  
                        </Card.Text>


                        <Card.Text>{leaves.reason2}</Card.Text>
                        <Card.Text style={{color:"red"}}>Status Of Request :  
                        </Card.Text>


                        <Card.Text>{leaves.status}</Card.Text>
                        <Card.Text style={{color:"red"}}>Supervisor :  
                        </Card.Text>


                        <Card.Text>{leaves.supervisor}</Card.Text>
                        <Card.Text style={{color:"red"}}>Leave Type :  
                        </Card.Text>


                        <Card.Text>{leaves.type}</Card.Text>


                        <Button variant="danger" onClick={() => deleteThisRequest(leaves.leaverequestid,leaves.status)}>Remove Request</Button>


                    </Card.Body>
                </Card>
            </div>

        </div>
    )
}

export default AllDetails