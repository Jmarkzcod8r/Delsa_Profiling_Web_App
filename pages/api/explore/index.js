//Only db.js and Client.js are required here...
import dbConnect from "../mongodb/db";
import Client from "../mongodb/ModelClient";
import Profiling from "../mongodb/Profiling";

dbConnect(); //---> This setups the database for this page.

// Oh so, I see the name isn't necessarily have to be 'index'
export default async function handler(req, res) {
  const { method } = req;
  // Below is needed. The quantity doesn't matter. You might as well put every details in here.
  // As one can see, I put the 'Kpop' in here but it has no effect whatsoever.
  const {
    email,
    firstname,
    lastname,
    middlename,
    nationality,
    birthday,
    gender,
    presentaddress,
    presentcity,
    permanentaddress,
    permanentcity,
    occupation,
    company,
    fathername,
    mothername,
    Kpop,
    newConnection,
    connectemail,
    houselotnumber,
    purok,
    barangay,
    city,
    connections,
    age,
    civilstatus,
    highesteducation,
    schoolattended,
    religion,
    ethnicity,
    contactnumber,
    telephonenumber,
  } = req.body;

  switch (method) {
    case "PUT":
      console.log("commencing PUT for ", { email });
      console.log("connect email: ", { connectemail });
      //   console.log("new connection: ", newConnection);
      const newConnection = {
        connectemail: connectemail,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
      };
      try {
        // if (!name && !email) return "inavalid data";
        await Profiling.updateOne(
          { email: email },
          {
            $push: {
              connections: newConnection,
            },
          }
          // newConnections.push {newConnection}
        );
        res.status(200).json({ success: true, desc: "nice" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "GET": //---> when 'axios.get' is called in our frontend, the system
      // goes to this .. GET & FIND
      console.log("commencing get ", email, lastname);
      try {
        const data = await Profiling.find({
          $or: [
            {
              email: email,
            },
            {
              lastname: lastname,
            },
          ],
        });
        res.status(200).json({ data: data });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "POST": //---> when 'axios.post' is called in our frontend, the system
      // goes to this .. POST & CREATE ... IF-THROW
      console.log("commencong POST for post folder ", email, lastname);
      try {
        const data = await Profiling.find({
          $or: [
            {
              email: email,
            },
            {
              lastname: lastname,
            },
          ],
        });
        res.status(200).json({ data: data });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }

      break;
  }
}
