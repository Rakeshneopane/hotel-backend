const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initialiseDatabase = async()=>{
    await mongoose.connect(mongoUri).then(()=>{
        console.log("Connected to Batabase");
    }).catch((error)=>console.log("Error while connecting to the Database", error));
}

module.exports = { initialiseDatabase };