import React from 'react'
import {Form,Card,Button,Container,Alert} from 'react-bootstrap'
import {useRef} from 'react'
import {useState} from 'react'
import {useAuth} from '../AuthContext'
import {Link,useHistory} from 'react-router-dom'


export default function Signup() {
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    const{signup,currentUser} =useAuth();
    const[error,seterror] = useState('');
    const[loading,setloading]=useState(false);
    const[messages,setmessages] = useState('');

    async function handlesubmit(e){
        e.preventDefault();
        if(passwordRef.current.value!==confirmRef.current.value){
           return  seterror('Sorry, the password and confirm-password fields do not match')
        }
        
            try{
                setloading(true);
                await signup(emailRef.current.value,passwordRef.current.value);
                setloading(false);
                setmessages("Successfully created account");
                history.push('/login')
            }
            catch(e){
                seterror("Sorry try again")
            }
            
        
        setloading(false);
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

                <Form.Group  className="mt-3" id="confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmRef} placeholder="Password" required/>
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox" className="mt-3">
                    <Form.Check type="checkbox" label="Accept all privacy terms" required/>
                </Form.Group>
                <Button variant="primary" className="w-100" type="submit">
                    Submit
                </Button>
            </Form>
            </Card.Body>
            </Card>
            </div>
            </Container>
        </>
    )
}
