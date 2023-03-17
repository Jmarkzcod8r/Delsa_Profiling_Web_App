import mongoose from "mongoose";
import { Getuserinfo } from "../../../functions global/Getuserinfo";

//-----------------Below is a copy from above----------------------
if (typeof window !== 'undefined') {
  const user = Getuserinfo()
var useremail = user.email 


let useremaillist=[];
useremaillist.append(user.email) }


const CredemailSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId, //---> This is considerable 
  log: String,
  desc: String,
  comments:String,
  name: String,
  date: String,
  highlight: String,
  credemail: String,
 
});


const Client = 
          mongoose.models.logdata
          || mongoose.model("logdata", CredemailSchema);



export default Client;
