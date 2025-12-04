import React, { useRef } from 'react'
import url from '../components/url'

function Updatepassword() {

    const oldpasswordref = useRef(null)
    const newpasswordref = useRef(null)
    const confirmpasswordref = useRef(null)

    async function handleUpdate() {

        const password = newpasswordref.current.value
        const confirmpassword = confirmpasswordref.current.value

        if (!password || !confirmpassword) {
            return alert("Please fill all fields")
        }

        if (password !== confirmpassword) {
            return alert("Passwords do not match")
        }

        const response = await fetch(url + "/changepassword", {
            method : 'post',
            headers : {
                'Content-type' : "application/json",
                'Authorization' : `Bearer ${sessionStorage.getItem('jwtToken')}`
            },
            body : JSON.stringify(
                {
                   newPassword : password,
                }
            )
        })
        const data = await response.json()

        if (data.success) {
            alert(data.message)
        }

        console.log(data);
        
    }

  return (
    <div>
        <div className="loginform">
            <h2>Change password</h2>
            <input ref={newpasswordref} type="text" placeholder='new password' />
            <input ref={confirmpasswordref} type="text" placeholder='confirm new password'/>
            <button onClick={handleUpdate}>Update password</button>
        </div>
    </div>
  )
}

export default Updatepassword