import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Headers from '../Navbar/Headers'
import AuthService from './Service/AuthService'
import * as BootStrap from 'react-bootstrap'



function Authority() {
    const[user,setUser] = useState([])
    const usenavigate = useNavigate()

    useEffect(()=>{
        gettingAll()
    },[])

    const gettingAll = () =>{
        AuthService.getAllUsers().then((response)=>{
            setUser(response.data)
        })
    }

    function viewleave(id){
        usenavigate('/permission/'+id)
    }

  return (
    <div>
        <Headers/>


        <br/><br/>

        <div>
        <BootStrap.Row xs={1} md={4} >
                        {
                            user.map(user =>
                                <BootStrap.Col>
                                    <div>
                                        <BootStrap.CardGroup>
                                            <BootStrap.Card>
                                                <BootStrap.Card.Body>
                                                    <BootStrap.Card.Text>
                                                        Username :  {user.email}
                                                    </BootStrap.Card.Text>
                                                    <BootStrap.Card.Text>Email :  {user.email}</BootStrap.Card.Text>
                                                    <BootStrap.Card.Text>Designation :  {user.designation}
                                                    </BootStrap.Card.Text>
                                                    <BootStrap.Card.Text>Supervisor :  {user.supervisor}
                                                    </BootStrap.Card.Text>
                                                </BootStrap.Card.Body>
                                                <BootStrap.Button onClick={() => viewleave(user.id)}>
                                                    Check
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
  )
}

export default Authority