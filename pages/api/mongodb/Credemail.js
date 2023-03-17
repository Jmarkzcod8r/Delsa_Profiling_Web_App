import mongoose from "mongoose"; //--> This is a standard for all 
  // back-end node


const CredemailSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId, //---> This is considerable 
 credemail: String
 
});

// "credemail" is one of your clusters.
const Credemail = 
              mongoose.models.credemail
            || mongoose.model("credemail", CredemailSchema);

export default Credemail;
