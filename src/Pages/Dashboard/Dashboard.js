import React from 'react'
import Headers from '../Navbar/Headers'
import './Styles/Dashboard.css'

function Dashboard() {
    return (
        <div>
            <Headers />
            <div className='dignity'>
            <h1>
                <span>We</span>
                <span>Are</span>
                <span>Happy To Help!</span>
                <h1>Raise A Request</h1>
            </h1>
            </div>
        </div>
    )
}

export default Dashboard