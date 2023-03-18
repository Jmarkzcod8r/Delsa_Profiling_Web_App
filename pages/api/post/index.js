//Only db.js and Client.js are required here...
import dbConnect from "../mongodb/db";
import Client from "../mongodb/ModelClient";
import Profiling from "../mongodb/Profiling";


dbConnect(); //---> This setups the database for this page.

// Oh so, I see the name isn't necessarily have to be 'index'
export default async function handler(req, res) {

  const { method } = req;
  const { email, firstname,lastname ,middlename , nationality , birthday,
    gender, presentaddress,  presentcity, permanentaddress, permanentcity,occupation,
    company,  fathername, mothername} = req.body;
  switch (method) {

    case "PUT":
      console.log("commencing PUT for ", {email});
      console.log("firstname: ", {firstname})
      try {

        // if (!name && !email) return "inavalid data";
        await Profiling.updateOne({ email: email },
          {firstname
            ,lastname ,middlename , nationality , birthday,
            gender, presentaddress,  presentcity, permanentaddress, permanentcity,occupation,
            company,  fathername, mothername
          }
           );
        res.status(200).json({ success: true , desc: 'nice'});
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

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
        console.log ("commencong POST for post folder ", email)
        try {
        // const {email} = req.body;

        const data = await
        Profiling.find ({email: email})

        res.status(200).json({data: data  })
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      };

      break;
  };


}
