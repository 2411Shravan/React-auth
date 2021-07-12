import React from 'react'
import {useAuth} from "../AuthContext"
import{Button} from 'react-bootstrap'
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'

export default function Dashboard() {
    const history = useHistory();
    const{logout,currentUser}=useAuth();
    async function handlelogout(e){
        e.preventDefault();
        try{
            await logout();
            history.push('/')
        }
        catch(e){
            console.log("Encountered an error");
        }
    }
    return (
        <div className="profile">
            <div className="pr-section">
               <Link to={`/user/profile/${currentUser.email}`}><h5>Profile</h5></Link>
            </div>
        <div className="text-center">
            <h1>{currentUser && currentUser.email}</h1>
            <Button className="btn btn-primary text-center wt-50"
            onClick={handlelogout}
            >Logout</Button>
        </div>
        </div>

    )
}
