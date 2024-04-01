const mongoose = require('mongoose');
require('dotenv').config();

const username = process.env.DB_USER
const password = process.env.DB_PW;

const connectToMongo =()=>{
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.65o6jzk.mongodb.net/taskManagementApp?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
console.log("Connected to Mongoose")
}).catch((err) =>{
    console.log("error in connecting")
})
}

module.exports=connectToMongo
