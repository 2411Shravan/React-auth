
import './App.css';
import React from 'react';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Home from './components/home';
import {BrowserRouter as Rt,Route,Switch} from 'react-router-dom';
import Error from './components/error'
import Navigation from './components/nav'
import {AuthProvider} from './AuthContext'
import Protected from './components/privateroute';
import ForgotPassword from './components/ForgotPassword'
import UpdateProfile from './components/privateprofile'

function App() {
  return (
    <Rt>
      
      <AuthProvider>
        <Navigation/>
      <Switch>
       
        
        <Route path="/login" component={Login}>
          <Login/>
        </Route>
       
        <Route exact path="/" component={Home}>
          <Home/>
        </Route>


        <Protected path="/dashboard" component={Dashboard}/>
        
        
        
        <Protected exact path="/user/profile/:id" component={UpdateProfile}/>
        

        
        <Route path="/signup" component={Signup}>
          <Signup/>
        </Route>

        <Route path="/forgot-password" component={ForgotPassword}>
          <ForgotPassword/>
        </Route> 

        
         

        <Route path="*" component={Error}>
          <Error/>
        </Route>  

        

      </Switch>
      </AuthProvider>
    </Rt>
  );
}

export default App;
