import React,{ useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../Api/AuthenticationService'

function Headers() {
  const [data, setData] = useState({})
  const usenavigate = useNavigate()
  

  React.useEffect(() => {
    fetchUserData().then((response) => {
      setData(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  function Logout  () {
    localStorage.clear()
    usenavigate('/')
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/dashboard">LeaveManagement</Navbar.Brand>
          <Nav className="me-auto">


            
            {data && data.roles && data.roles.filter(value => value.roleCode === "ADMIN").length &&
              <Nav.Link href="/approvallist">Approve Leave</Nav.Link>}
            {data && data.roles && data.roles.filter(value => value.roleCode === "ADMIN").length &&
            <Nav.Link href="/signup">Register New User</Nav.Link>}
            {data && data.roles && data.roles.filter(value => value.roleCode === "ADMIN").length &&
            <Nav.Link href="/grantAuthority">Grant Authority</Nav.Link>}




            {data && data.roles && data.roles.filter(value => value.roleCode === "USER").length &&
              <Nav.Link href="/addleave">ADD Leave</Nav.Link>}
            {data && data.roles && data.roles.filter(value => value.roleCode === "USER").length &&
            <Nav.Link href="leaves">Leave History</Nav.Link>}



            {data && data.roles && data.roles.filter(value => value.roleCode === "MANAGER").length &&
              <Nav.Link href="/approvallist">Approve Leave</Nav.Link>}
            {data && data.roles && data.roles.filter(value => value.roleCode === "MANAGER").length &&
              <Nav.Link href="/addleave">ADD Leave</Nav.Link>}
            

            <Nav.Link onClick={() => Logout()}>Logout</Nav.Link>

          </Nav>
        </Container>
      </Navbar>



    </div>
  );
}

export default Headers;