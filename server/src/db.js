const mongoose = require("mongoose");

async function DB_connect(){
   try {
    await mongoose.connect("mongodb+srv://blissfulwed8:UInGWjPyu4aIffz4@cluster0.pezd8.mongodb.net/blissfulwedDB?retryWrites=true&w=majority&appName=Cluster0")
    console.log("MongoDB Connected");
    
   } catch (error) {
    console.log("Error while connecting to MongoDB");
    console.log(error);
   }
}

module.exports = {DB_connect}