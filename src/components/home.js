import React from 'react'
import {useAuth} from "../AuthContext"
export default function Home() {
    const{signup,currentUser} =useAuth();
    return (
        <div>
            {
                currentUser && <p>{currentUser.email}</p>
            }
            <h1>This is home section</h1>
        </div>
    )
}
