import React from 'react'
import { Container,Form,Button,Card,Alert } from 'react-bootstrap';
import { useRef,useState } from 'react';
import {useAuth} from '../AuthContext'
import{Link,useHistory} from 'react-router-dom'



export default function Login() {
    const history=useHistory();
    const emailRef=useRef();
    const passwordRef=useRef();
    const[messages,setmessages] =useState('');
    const[loading,setloading] = useState(false);
    const[error,seterror] = useState('');
    const{login,currentUser}=useAuth();


    async function handlesubmit(e){
        e.preventDefault();
        try{
            setloading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            
            setmessages("Successfully logged in");
            history.push('/dashboard')

        }
        catch(e){
            seterror("Sorry,there was an error with login system/Database")
        }
        setloading(false);
    }


    if(loading){
        return(
            <h1>Loading....</h1>
        )
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
                messages && <Alert varinat="success">{messages}</Alert>
            }
            <Form onSubmit={handlesubmit}>
                <Form.Group  className=" mt-4" id="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="Enter email" required/>
                    
                </Form.Group>

                <Form.Group  className="mt-3" id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="Password" required/>
                </Form.Group>
                <Form.Text className="text-muted">
                    We'll keep your password protected.
                </Form.Text>

                
                <Button variant="primary" className="w-100" type="submit">
                    Submit
                </Button>
            </Form>
            </Card.Body>
            <div className="w-100 text-center">
            Forgot password? <Link to="/forgot-password">Click here</Link>
            </div>
           
            </Card>
            </div>
            </Container>
        </>
    )
}
