import mongoose from "mongoose";
import { Getuserinfo } from "../../../functions global/Getuserinfo";
// This defines the schema seetings for our database.
// Services --> Models -->
// const ClientSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   createdAt: {
//     type: Date,
//     default: new Date(),
//   },
// });
// // Is this how it should be done?
// // If you want to make a new Schema, modify below.
// const Client = mongoose.models.thisschema || mongoose.model("thisschema", ClientSchema);

// export default Client;
//-----------------Below is a copy from above----------------------
if (typeof window !== 'undefined') {
  const user = Getuserinfo()
var useremail = user.email
  //   const user = Getuserinfo();
  //   res.json(user.email)
  // }

// const [userInfo] = await Getuserinfo();
// var useremail = userInfo.email

//What is this for?
let useremaillist=[];
useremaillist.append(user.email) }


const profileSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId, //---> This is considerable
  email: String,
  password: String,
  type:String,
  firstname: String,
  lastname: String,
  middlename: String,

  photoref: String,

  nationality: String,
  birthday: String,
  gender: String,
  houselotnumber: String,
  purok: String,
  barangay: String,
  city: String,

  age: String,
  civilstatus: String,
  highesteducation: String,
  schoolattended: String,
  religion: String,
  ethnicity: String,
  contactnumber: String,
  dateregistered: String,

  religion: String,
  ethnicity: String,
  contactnumber: String,
  telephonenumber: String,

  // presentaddress: String,
  // presentcity: String,
  // permanentaddress: String,
  // permanentcity: String,
  occupation: String,
  company: String,
  fathername: String,
  mothername: String,
  connections:[],

  dateregistered: String,


});


const Profiling =
          mongoose.models.profiling
          || mongoose.model("profiling", profileSchema);

// const Client =
//             mongoose.models.useremail
//           || mongoose.model(useremail, ClientSchema);

export default Profiling;
