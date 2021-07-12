import React from 'react'
import {Form,Card,Button,Container,Alert} from 'react-bootstrap'
import {useRef} from 'react'
import {useState} from 'react'
import {useAuth} from '../AuthContext'
import {Link,useHistory} from 'react-router-dom'



export default function Update() {
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    
    const[error,seterror] = useState('');
    const[loading,setloading]=useState(false);
    const[messages,setmessages] = useState('');
    const {currentUser,updatePassword,updateEmail}=useAuth();

    function handlesubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== confirmRef.current.value) {
          return seterror("Passwords do not match")
        }
    
        const promises = []
        setloading(true)
        seterror("")
    
        if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value))

          
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
          }
    
        Promise.all(promises)
          .then(() => {
            history.push("/dashboard")
          })
          .catch(() => {
            seterror("Failed to update account")
          })
          .finally(() => {
            setloading(false)
          })
      }

    if(loading){
        return(
            <h1>Loading....</h1>
        )
    }

    return (
        <>
        <div>
           <p> {currentUser && currentUser.email}</p>
        </div>
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
                    <Form.Control defaultValue={currentUser && currentUser.email} type="email" ref={emailRef} placeholder="Enter email" required/>
                    
                </Form.Group>

                <Form.Group  className="mt-3" id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Keep this field empty for no changes." ref={passwordRef}/>
                </Form.Group>
                <Form.Text className="text-muted">
                    We'll keep your password protected.
                </Form.Text>

                <Form.Group  className="mt-3" id="confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Keep this field empty for no changes." ref={confirmRef}/>
                </Form.Group>

                
                <Button variant="primary" className="w-100 mt-4" type="submit">
                    Update
                </Button>
            </Form>
            </Card.Body>
            <div className="w-100 text-center">
            <Link to="/dashboard">Cancel</Link>
            </div>
            </Card>
            </div>
            </Container>
        </>
        
    )
}
