import React, { useState } from 'react';
import './login.css'
import {Login} from '../../services/account.service'
import { Link } from 'react-router-dom';
export default function LoginComponent() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleLogin = () => {
      Login(email,password)
      .then((result)=>{
        var token = email + ":" + password;
        var hash = btoa(token);
        localStorage.setItem('token',hash);
        window.location.replace("/media")
      })
      .catch((err)=>{
        alert(err.message);
      })
  }
  const token = localStorage.getItem('token')
  if(token!=undefined && token!=null){
    window.location.replace("/media")
  }
  return (
    <div id="login-form-wrap">
      <h2>Login</h2>
      <div id="login-form">
        <p>
          <input
          type="text" 
          id="email" 
          name="email" 
          className='control-label'
          placeholder="Email" 
          value={email} required
          onChange={e => setEmail(e.target.value)} />
          <i className="validation">
            <span></span>
            <span></span>
          </i>
        </p>
        <p>
          <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Password" 
          required 
          value={password}
          onChange={e => setPassword(e.target.value)} />
          <i className="validation">
            <span></span>
            <span></span>
          </i>
        </p>
        <p>
          <input type="submit" id="login" value="Login" onClick={handleLogin} />
        </p>
        <p>
        <Link to="/register">Create Account</Link>
        </p>
        <br/>
        <hr/>
        <br/>
      </div>
    </div>
  );
}
