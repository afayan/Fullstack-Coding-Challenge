import React from "react";
import '../styles/login.css'
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

    const passwordRef = useRef(0);
    const emailref = useRef(0);
    const navigate = useNavigate()

    async function handleLogin() {
        const email = emailref.current.value
        const password = passwordRef.current.value

        if (!password || !email) {
            return alert("Please fill all fields")
        }        

        const response = await fetch("http://localhost:2200/login", {
            method : 'post',
            headers : {
                'Content-type' : "application/json"
            },
            body : JSON.stringify(
                {
                    password,
                    email
                }
            )
        })

        const data = await response.json()

        if (data && data.success) {
            console.log(data);
            
            sessionStorage.setItem('jwtToken', data.jwtToken)

            navigate('/dashboard')

        }
        else{
            alert(data.message)
        }

    }

    return <>
    <div className="loginform">
    <h1>Login</h1>
        <input ref={emailref} type="email" placeholder="email"/>
        <input ref={passwordRef} type="password" placeholder="password"/>
        <button onClick={handleLogin}>Submit</button>
        <Link to={'/register'}>Dont have an account? Register</Link>
    </div>
    </>
}