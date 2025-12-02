import db from "../database/database.js";

export default function handleGetStores(req, res) {

    let admin = true
    if (admin) {
        if (req.query.filter) {
            db.query("select s.storeid, s.address, s.name, ifnull(avg(r.rating), 0) as average from stores s left join ratings r using (storeid) where s.name like ? or s.address like ? or s.email like ? group by s.storeid;", ["%" + req.query.filter + "%", "%" + req.query.filter + "%", "%" + req.query.filter + "%"], (error, result)=>{
                if (error) return res.json({error})
        
                return res.json({result : result})
            })
        }
        else{
            db.query("select s.storeid, s.address, s.name, ifnull(avg(r.rating), 0) as average from stores s left join ratings r using (storeid) group by s.storeid;", [], (error, result)=>{
                if (error) return res.json({error})
        
                return res.json({result : result})
            })

        }
    }

    else{
        if (req.query.filter) {
            db.query("select * from stores s where s.name like ? or s.address like ?;", ["%" + req.query.filter + "%", "%" + req.query.filter + "%"], (error, result)=>{
                if (error) return res.json({error})
        
                return res.json({result : result})
            })
        }
        else{
            db.query("select * from stores;", [], (error, result)=>{
                if (error) return res.json({error})
        
                return res.json({result : result})
            })

        }
    }
    




}