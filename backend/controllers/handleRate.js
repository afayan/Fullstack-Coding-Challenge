import db from "../database/database.js"

export default function handleRate(req, res){

    const {userid, storeid, rating} = req.body

    if (!userid || !storeid || !rating) {
        return res.json({'success' : false})
    }

    db.query("insert into ratings(rating, userid, storeid) values (?, ?, ?);", [ rating, userid, storeid], (error, result)=>{
        if (error) return res.json( {success: false, error :  error})

        res.json({'success' : true})
    })

}