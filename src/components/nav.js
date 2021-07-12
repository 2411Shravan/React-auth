import React from 'react'
import {Navbar,Nav,Link} from "react-bootstrap"
import {useAuth} from "../AuthContext"
import { useHistory } from 'react-router';


export default function Navigation() {
    const history = useHistory();
    const {logout,currentUser}= useAuth();
async function handlelogout(e){
    e.preventDefault();
    try{
        await logout();
        history.push('/login');
    }
    catch(e){
        console.log("someting wrong sorry");
    }
}
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav >
                    <Nav.Link href="/">Home</Nav.Link>
                    {
                        !currentUser && <Nav.Link href="/login">Login</Nav.Link>
                    }
                    {
                        !currentUser && <Nav.Link href="/signup">Signup</Nav.Link>
                    }
                    
                    
                    {
                        currentUser &&  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    }
                    {
                        currentUser &&  <Nav.Link onClick={handlelogout}>Logout</Nav.Link>
                    }
                   
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
