import mongoose from "mongoose";


const ClientSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId, //---> This is considerable 
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  firstname:{ type: String, default: '' },
  lastname: { type: String, default: '' },
  middlename: { type: String, default: '' },
  nationality: { type: String, default: '' },
  birthday: { type: String, default: '' },
  gender:{ type: String, default: '' },
  presentaddress: { type: String, default: '' },
  presentcity: { type: String, default: '' },
  permanentaddress: { type: String, default: '' },
  permanentcity: { type: String, default: '' },
  occupation: { type: String, default: '' },
  company:{ type: String, default: '' },
  presentaddress: { type: String, default: '' },
  fathername: { type: String, default: '' },
  mothername: { type: String, default: '' },


});


const Client = 
              mongoose.models.logdata
            || mongoose.model("Profiling", ClientSchema);

// const Client = 
//             mongoose.models.useremail
//           || mongoose.model(useremail, ClientSchema);

export default Client;
