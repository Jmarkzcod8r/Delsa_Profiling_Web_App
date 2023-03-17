// /Only db.js and Client.js are required here...
import dbConnect from "../mongodb/db";
import Client from "../mongodb/ModelClient";
import Profiling from "../mongodb/Profiling";


dbConnect(); //---> This setups the database for this page.

// Oh so, I see the name isn't necessarily have to be 'index'
export default async function handler(req, res) {

  const { method } = req;
  // const { log, desc, comments, name, date, highlight, credemail} = req.body;
  switch (method) {

    case "GET": //---> when 'axios.get' is called in our frontend, the system
                // goes to this .. GET & FIND
      try {
        const clients = await Profiling.find({
          }); //---> clients is an objects
  // Deleting below produces an error: API resolved without
  // sending a response for /api/clients, this may result in stalled requests.
        res.status(200) //---> The '.status' in 'res.status' ig ignorable.
        // as res in integrated with data received. res & data go in twined.
                      .json({clients });
        // res.json(')
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
        // console.log('sorry');
      }
      break;

    case "POST": //---> when 'axios.post' is called in our frontend, the system
    // goes to this .. POST & CREATE ... IF-THROW

        try {
        const {email, password, firstname, lastname, middlename, nationality, birthday, gender,presentaddress , presentcity,
          permanentaddress, permanentcity, occupation, company, fathername, mothername } = req.body;

        await
        new Profiling (req.body).save();

        res.status(200).json({success:true, body:req.body , })
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      };

      break;
  };


}
