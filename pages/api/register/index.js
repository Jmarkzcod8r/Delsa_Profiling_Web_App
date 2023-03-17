//Only db.js and Client.js are required here...
import dbConnect from "../mongodb/db";
import Client from "../mongodb/ModelClient";
import Profiling from "../mongodb/Profiling";
const express = require('express');

const db = dbConnect(); //---> This setups the database for this page.

const app = express();
// Oh so, I see the name isn't necessarily have to be 'index'
export default async function handler(req, res) {

  const { method } = req;
  const { email, password} = req.body;
  switch (method) {

    case "GET": //---> when 'axios.get' is called in our frontend, the system
                // goes to this .. GET & FIND
                console.log("commencing get ", {email})
      try {
        const clients = await Profiling.find({ email
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
        // (console.log ("email password", email, password))
        // Traditionally, I know "POST" to be for creation of new objects to the database,
        // It is only recently, I knew it can be use to send a query too.
        console.log("commencing register post ", email , password)
    try {
      const client = await new Profiling (req.body).save();

        res.status(200).json({success:true, body:client  })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "No such record",success: false, error });
      // console.log('sorry');
    }

      break;
  };


}
