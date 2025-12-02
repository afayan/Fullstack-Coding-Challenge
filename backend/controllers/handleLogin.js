import db from "../database/database.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default function handleLogin(req, res){
    const {email , password} = req.body


    db.query("select * from users where email = ? ;", [email], (error, result)=>{
        if (error) return res.json({success : false, message : "An error occurred"})
        console.log(result);

        if (result.length == 0) {
            return res.json({success : false, message : 'incorrect email'})
        }

        if (!bcrypt.compareSync(password, result[0].password)) {
            return res.json({success : false, message : 'incorrect pasword'})
        }

        const tokendata = {userid : result[0].userid, role : result[0].role, email : result[0].email}
        console.log(tokendata, process.env.JWT_SECRET);

        const token = jwt.sign(tokendata, process.env.JWT_SECRET)
        res.json({success : true, jwtToken : token})
    })
}