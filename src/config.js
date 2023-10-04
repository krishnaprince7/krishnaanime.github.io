const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://0.0.0.0/Loginform");

connect.then(()=>{
    console.log("Database conected");
})
.catch(()=>{
    console.log("Databace conmot connected");
})

const LOginSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

const collection = new mongoose.model("users",LOginSchema);

module.exports = collection;
