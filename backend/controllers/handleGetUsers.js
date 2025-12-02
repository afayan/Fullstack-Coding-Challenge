import db from "../database/database.js";

export default function handleGetUsers(req, res) {
    if (req.query.filter) {
    db.query("select * from users where name like ? or address like ? or email like ?  ;", ["%" + req.query.filter + "%", "%" + req.query.filter + "%", "%" + req.query.filter + "%"], (error, result)=>{
        if (error) return res.json({error})

        return res.json({result : result})
    })
}
else{
    db.query("select * from users;", [], (error, result)=>{
        if (error) return res.json({error})

            
            return res.json({result : result})
        })

}
}