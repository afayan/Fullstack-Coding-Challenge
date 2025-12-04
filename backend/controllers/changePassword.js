import db from "../database/database.js"
import bcrypt from 'bcrypt'

export default function changePassword(req, res) {
    
    const email = req.user.email
    const newPassword = req.body.newPassword

    const hash = bcrypt.hashSync(newPassword, 10)

    db.query("update users set password = ? where email = ? ;", [hash, email], (error, result)=>{
        if (error) return res.json({success : false, message : "An error occurred"})

        return res.json({success : true, message : "Password updated successfully"})
    })

}