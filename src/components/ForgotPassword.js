import React from 'react'
import { useState,useRef} from 'react'
import {Card,Alert,Form,Button,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useAuth} from "../AuthContext"

export default function ForgotPassword() {
    const {resetPassword}=useAuth();
    const emailRef= useRef();
    const[error,seterror]= useState("");
    const[message,setmessage]=useState("");
    const[loading,setloading]=useState(false);

    async function handlesubmit(e){
        e.preventDefault();
        try{
            setloading(true);
            await resetPassword(emailRef.current.value);
            setloading(false);
            setmessage("A mail is sent to you please check that mail to proceed.Thank you.")
            
        }
        catch(e){
            console.log("Sorry for the inconvinience")
        }
    }
if(loading){
    return (
    <div className="text-center">
        <h1>Loading...</h1>
    </div>
    );
}

    return (
       <>
            
       <Container className="d-flex align-items-center justify-content-center"
      style={{minHeight:"100vh"}}>
      <div className="w-100" style={{maxWidth:"350px"}}>
        <Card>
            <Card.Body>
            {
                error && <Alert variant="danger">{error}</Alert>
            }
            {
                message && <Alert variant="success">{message}</Alert>
            }
            <Form onSubmit={handlesubmit}>
                <Form.Group  className=" mt-4" id="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="Enter email" required/>
                    
                </Form.Group>

                <Button variant="primary" className="w-100 mt-3" type="submit">
                    Submit
                </Button>
            </Form>
            </Card.Body>
            <div className="w-100 text-center">
            Remember password? <Link to="/login">Login here</Link>
            </div>
            <div className="w-100 text-center">
            In need an account? <Link to="/signup">Signup here</Link>
            </div>
           
            </Card>
            </div>
            </Container>
        </>
    )
}
