const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'navinmysql123',
  database: 'college'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ]
};


//home rout
app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM user `;
  connection.query(q, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      let count = result[0]['COUNT(*)']
      console.log("Count from DB:", result[0]);
      res.render("home.ejs", { count });
    }
  })
});

//edit rout
app.get("/user/:id/edit", (req, res) => {
  const { id } = req.params;

  const q = `SELECT * FROM user WHERE id = ?`;
  connection.query(q, [id], (err, results) => {
    if (err) {
      return res.send("DB ERROR while fetching user.");
    }
    if (results.length === 0) {
      return res.send("No user found.");
    }

    const user = results[0];
    res.render("edit.ejs", { user });
  });
});

//update 
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;

  let q = `SELECT * FROM user WHERE id='${id}'`;

  connection.query(q, (err, result) => {
    if (err) {
      return res.send("DB ERROR");
    }

    let user = result[0];
    if (formPass != user.password) {
      return res.send("WRONG PASSWORD");
    }

    let q2 = `UPDATE user SET username ='${newUsername}' WHERE id='${id}'`;

    connection.query(q2, (err2) => {
      if (err2) {
        return res.send("ERROR OCCURRED DURING UPDATE");
      }
      return res.redirect("/user");
    });
  });
});

//data from new user
app.post("/user" , (req, res)=> {
  let {username , password , email} = req.body;
  const id = faker.string.uuid();

  let q = `INSERT INTO user (id , username , password, email) VALUE (?,?,?,?)`;
  const values = [id , username , password, email];

  connection.query(q , values, (err, result)=>{
    if(err){
      res.send("AN error occured");
    }else{
      res.redirect("/user");
    }
  })
})

//add user rout 
app.get("/user/add" , (req, res)=> {
  res.render("addUser.ejs");
})


//delete user rout
app.get("/user/:id/delete" , (req, res) =>{
  let {id} = req.params;
  q = `SELECT * FROM user WHERE id='${id}'`;

  connection.query(q , (err, result)=>{
    if(err){
      res.send("error occured");
    }else{
      let user = result[0];
      console.log(user);
      res.render("delete" , {user} );
    }
  })
})

//delete user from db
app.delete("/user/:id" , (req, res) =>{
  let {id} = req.params;
  let { email , password} = req.body;
  q = `SELECT * FROM user WHERE id='${id}'`;

  connection.query(q , (err, result)=>{
    if(err){
      res.send("error occured");
    }else{
      let user = result[0];
      if(email != user.email || password != user.password){
        res.send("EMAIL ,OR PASSWORD WRONG");
      }else{
        let q = `DELETE FROM user WHERE id = '${id}'`;
        connection.query(q , (err, result)=>{
          if(err){
            res.send("ERROR OCCURED");
          }else {
            res.redirect("/user");
          }
        })
      }
    }
  })
})

//user rout 
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  connection.query(q, (err, result) => {
    if (err) {
      res.send("An error occurred");
    } else {
      res.render("showUsers.ejs", { result });
    }
  });
});

app.use((req, res) => {
  res.status(404).send(`Route not found: ${req.originalUrl}`);
});

app.listen("3000", () => {
  console.log("server is listening on port 3000");
});
