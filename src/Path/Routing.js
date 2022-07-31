import React from 'react'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Addleave from '../Pages/AddLeaves/Addleave'
import Approve from '../Pages/ApproveLeave/Approve'
import Review from '../Pages/ApproveLeave/UpdateLeaveRequest/Review'
import Authority from '../Pages/Authority/Authority'
import Permission from '../Pages/Authority/Permission'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Headers from '../Pages/Navbar/Headers'
import Login from '../Pages/Security/Login'
import Signup from '../Pages/Security/Signup'
import AllDetails from '../Pages/User/MoreView/AllDetails'
import ViewLeave from '../Pages/User/ViewLeave'

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/addleave' element={<Addleave/>}/>
            <Route path='/leaves' element={<ViewLeave/>}/>
            <Route path='/viewrequest/:id' element={<AllDetails/>}/>
            <Route path='/approvallist' element={<Approve/>}/>
            <Route path='/reviewrequest/:id' element={<Review/>}/>
            <Route path='/grantAuthority' element={<Authority/>}/>
            <Route path='/permission/:id' element={<Permission/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Routing