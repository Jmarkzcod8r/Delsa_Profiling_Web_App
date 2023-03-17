// This is the main backend for your web app. The rest are secondaries.
// db.js -> dri bilin imo package para i.send...=>
import mongoose from "mongoose";

const connection = {};

async function dbConnection() {
  // This can may as well as be a template.
  if (connection.isConnected) {
    return;
  }
  // Setting up our database package.. 
  // The folder 'services' most likely set up as a foundation for this app for the database.
  const db = await mongoose.connect(process.env.MONGODB_URI,  {
    // const db = await mongoose.connect("mongodb+srv://newuser:Wisdoms3@crud.eg4wqwm.mongodb.net/Firedata", {
    
    useNewUrlParser: true, //--> This is use to prevent bugs due to version upgrade.
  });
  // Not quite sure with this one..need further review.
  connection.isConnected = db.connections[0].readyState;
}

export default dbConnection;
