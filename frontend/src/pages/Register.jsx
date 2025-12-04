import React from "react";
import '../styles/login.css'
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import url from "../components/url";

export default function Register() {

    const passwordRef = useRef(null);
    const emailref = useRef(null);
    const addressref = useRef(null)
    const nameref = useRef(null)
    const navigate = useNavigate()

    async function handleRegister() {
        const email = emailref.current.value
        const password = passwordRef.current.value
        const address = addressref.current.value
        const name = nameref.current.value


        if (!password || !email || !address || !name) {
            return alert("Please fill all fields")
        }

        console.log({
                    password,
                    email,
                    address,
                    name
                });
        

        const response = await fetch( url + "/register", {
            method : 'post',
            headers : {
                'Content-type' : "application/json"
            },
            body : JSON.stringify(
                {
                    password,
                    email,
                    address,
                    name
                }
            )
        })
        const data = await response.json()

        console.log(data);
        

        alert(data.message)
    }

    return <>
    <div className="loginform">
        <h1>Register</h1>
        <input ref={nameref} type="text" placeholder="name"/>
        <input ref={emailref} type="email" placeholder="email"/>
        <input ref={passwordRef} type="password" placeholder="password"/>
        <input ref={addressref} type="text" placeholder="address"/>
        <button onClick={handleRegister}>Submit</button>
        <Link to={'/login'}>Already have an account? Login</Link>
    </div>
    </>
}