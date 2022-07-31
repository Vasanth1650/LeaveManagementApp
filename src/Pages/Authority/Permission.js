import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Headers from '../Navbar/Headers'
import AuthService from './Service/AuthService'
import * as BootStrap from "react-bootstrap"

function Permission() {
    const {id} = useParams()
    const usenavigate = useNavigate()
    const [roleCode,setRoleCode] = useState('')
    const [roleDescription,setRoleDescription] = useState('')

    useEffect(()=>{
        changeAuthority()
       
    },[])

    const changeAuthority = () =>{
        AuthService.getById(id).then((response)=>{
            setRoleCode(response.data.roleCode)
            setRoleDescription(response.data.roleDescription)
        })
    }

    const handleClick = () =>{
        const auth = {roleCode,roleDescription}
        AuthService.updateAuthority(id,auth).then((response)=>{
            console.log(response)
            usenavigate(-1)
        }).catch((error)=>{
            console.log(error)
        }) 
    }

    

  return (
    <div>
        <Headers/>
        <br/><br/>
        <input value={roleCode} onChange={(e)=>setRoleCode(e.target.value)}/>
        <input value={roleDescription} onChange={(e)=>setRoleDescription(e.target.value)}/>
        <br/><br/>
        <BootStrap.Button onClick={handleClick}>Change</BootStrap.Button>
    </div>
  )
}

export default Permission