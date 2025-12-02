import mysql2 from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql2.createConnection({
    user : 'root',
    host : "localhost",
    password : process.env.MYSQL,
    database : "storeratings"
})

// db.query("drop table ratings;", [], (error, result)=>{
//     if (error) {
//         return console.error(error);
//     }
//     console.log("Table dropped");
// })

db.query("create table if not exists users(userid int primary key auto_increment, name varchar(60), address varchar(400), password varchar(200), email varchar(100) unique not null, role varchar(100));", [], (error, result)=>{
    if (error) {
        return console.error(error);
    }
    console.log("Table users created");
})

db.query("create table if not exists stores(storeid int primary key auto_increment, email varchar(100), name varchar(200), address varchar(200));", [], (error, result)=>{
    if (error) {
        return console.error(error);
    }
    console.log("Table stores created");
})

db.query("create table if not exists ratings(ratingid int auto_increment primary key, rating int, userid int, storeid int, foreign key (userid) references users(userid), foreign key (storeid) references stores(storeid));", [], (error, result)=>{
    if (error) {
        return console.error(error);
    }
    console.log("Table ratings created");
})

export default db