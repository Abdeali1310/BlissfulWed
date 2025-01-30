const mongoose = require("mongoose");

async function DB_connect(){
   try {
    await mongoose.connect(process.env.DB_URL)
    console.log("MongoDB Connected");
    
   } catch (error) {
    console.log("Error while connecting to MongoDB");
    console.log(error);
   }
}

module.exports = {DB_connect}