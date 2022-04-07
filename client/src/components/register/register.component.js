import React, { useState } from 'react';
import { Register } from '../../services/account.service'
import { Link } from 'react-router-dom';
export default function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = () => {
    Register(email,password,firstName,lastName)
    .then((result)=>{
      window.location.replace("/")
    })
    .catch((err)=>{
      alert(err.message);
    })
  }

  return (
    <div id="login-form-wrap">
      <h2>Create Account</h2>
      <div id="login-form">
        <p>
          <input
            type="text"
            id="email"
            name="email"
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
        </p>
        <p>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={firstName} required
            onChange={e => setFirstName(e.target.value)} />
        </p>
        <p>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={lastName} required
            onChange={e => setLastName(e.target.value)} />
        </p>
        <p>
          <input type="submit" id="register" value="Create Account" onClick={handleRegister} />
        </p>
        <p>
          <Link to="/">Have account? Login Instead</Link>
        </p>
        <br/>
        <hr/>
        <br/>
      </div>
    </div>
  );
}
