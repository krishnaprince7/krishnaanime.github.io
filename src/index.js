const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config")


const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");


app.use(express.static("public"))
// app.use(express.static(path.join(__dirname , "public")))





app.get("/",(req,res)=>{
    res.render("login")
});

app.get("/signup",(req,res)=>{
    res.render("signup")
});

app.post("/signup",async (req,res) =>{
    const data = {
        name:req.body.username,
        password:req.body.password

    }

    const exsisteruser = await collection.findOne({name:data.name});

    if(exsisteruser){
        res.render("alredyuser")
        // alert("baak bosdike")
    }
    else{
        const saltrounds =10;
        const hashpaswoord= await bcrypt.hash(data.password,saltrounds)
        data.password = hashpaswoord;



        const userdata = await collection.insertMany(data);
        console.log(userdata);

    }

    const userdata = await collection.insertMany(data);
    console.log(userdata);
    res.render("back");
   
   


})

app.post("/login",async (req,res)=>{

    try{
        const cheeck = await collection.findOne({name: req.body.username});
        if(!cheeck){
            res.render("not")
        }
       

 const ispaswwordmatch = await bcrypt.compare(req.body.password,cheeck.password);
        if(ispaswwordmatch){
            res.render("home");

        }
        else{
            res.render("wrongpass")
        }
    }catch{
        res.render("not")

    }
    
   
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("surver is running at port 3000")

}) 