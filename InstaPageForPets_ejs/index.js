const express = require("express");
const app = express();

const port = 3000;

app.set("view engine" ,"ejs");

app.get("/ig/:username" , (req, res) => {
    let {username} = req.params;
    const instaData = require("./data.json");

    const data = instaData[username];
    console.log(data);
    if(data){
        res.render("instagram.ejs", {data});
    }else{
        const usernames = Object.keys(instaData);
        res.render("error.ejs" , {names : usernames} )
    }
    
})

app.listen(port , ()=> {
    console.log(`listing on port ${port}`);}
);