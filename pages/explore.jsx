import { React, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CotPic from "./Pics/Cot_panorama.png";
import CotSeal from "./Pics/Cot_seal.png";
import CotBrgy from "./Pics/Cotbrgy.png";

export default function Explore() {
  // const [explorelist, setExplorelist] = useState ('')
  const [explorelist, setExplorelist] = useState([]);
  const [email, setEmail] = useState("");
  const [connectemail, setConnectemail] = useState("");

  const [connectlist, setConnectlist] = useState([]);

  const [mainlist, setMainlist] = useState([]);

  const [conemails, setConemails] = useState ([])

  async function getConnections() {
    try {
      // This is for getting connections
      const { data } = await axios.post(
        localStorage.getItem("baseURL") + "/api/explore2",
        //Let's send these as body to the back-end
        {
          // lastname: lastname,
          email: JSON.parse(localStorage.getItem("email")),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data) {
        try {
          console.log(data)
          console.log("data for connectlist: ", data.data[0].connections)

          setConnectlist(data.data[0].connections)
          console.log("connectlist: ",data.data[0].connections)

          localStorage.setItem("list", JSON.stringify(data.data[0].connections.map(obj=> obj.connectemail)))

        } catch (err) {
          console.log(err)
        }

      }
    } catch (err) {
      console.log("this is error: ",err);
    }
  }

  const exlist = [];

  async function getData() {
    try {
      console.log('connectlist aa: ',connectlist)
      const conemailss = connectlist.map(obj => obj.connectemail)
      setConemails(conemailss)

      console.log('connectlist: bb',connectlist)
      console.log('explorelist: ',explorelist)
      console.log('conemails: ',conemailss)
      console.log('coemails list: ',JSON.parse(localStorage.getItem('list')))
      console.log('conemails: ',connectlist.map(obj => obj.connectemail))


      const { data } = await axios.post(
        localStorage.getItem("baseURL") + "/api/explore",
        //Let's send these as body to the back-end
        {
          lastname: localStorage.getItem("lastname"),
          email: localStorage.getItem("email"),
          middlename: localStorage.getItem("middlename"),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      // return data
      if (data) {

        // console.log("data: ",data)
        const conemails = (JSON.parse(localStorage.getItem('list')))

        // if (localStorage.getItem('Explorelistbool') != "true") {
          for (let i = 0; i < data.data.length; i++) {
            if (conemails.includes(data.data[i].email) ) {
              console.log("match with ",data.data[i].email)

          } else {console.log("no match") ;  exlist.push(data.data[i]);}
          }

        localStorage.setItem("Explorelist", JSON.stringify(conemails));
        console.log('exlist: ',exlist)
        setExplorelist(exlist);

      }
    } catch (err) {
      console.log(err);
    }




  }


  async function UpdateConnections(
    email,
    elemail,
    elfirstname,
    elmiddlename,
    ellastname
  ) {
    try {

      const { response } = await axios.put(
        localStorage.getItem("baseURL") + "/api/explore",
        {
          email: email,
          connectemail: elemail,
          firstname: elfirstname,
          middlename: elmiddlename,
          lastname: ellastname,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("this is response: ", response)
    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem("email")));
    getConnections();
    console.log(connectlist)
    getData();
    // console.log("explorelist: ",explorelist    )
    // console.log(connectlist.length)
    // console.log("connectlist: ", connectlist)
  }, [email ]); //--> The empty array makes the useEffect to execute only once && it works

  return (
    <div className="bg-pink-300 h-screen flex justify-center items-center relative ">
      <Image
        className="absolute w-screen relative"
        src={CotPic}
        layout="fill"
        alt=" "
      />
      <div
        className=" bg-blue-100 min-h-[80%] min-w-[40%] pt-5 px-5 rounded-md  flex
                absolute opacity-[94%] "
      >
        <div className="flex m-4 flex-col items-center w-[20em] bg-purple-100">
          <h1 className="mb-5">PEOPLE YOU MIGHT KNOW</h1>

          <div className="flex flex-col w-full">
            {explorelist.map((el) => (
              <button
                key={el._id}
                className="bg-violet-200  mt-2"
                onClick={function () {
                  setConnectemail(el.email);
                  UpdateConnections(
                    email,
                    el.email,
                    el.firstname,
                    el.middlename,
                    el.lastname
                  );
                  getConnections()
                  getData()
                  setConemails([...conemails,el.email])
                  // conemails.push(el.email)

                  console.log("updating");
                }}
              >
                {el.firstname} {el.middlename} {el.lastname} <strong>{el.email}</strong>
              </button>
            ))}
          </div>
          <h5 className="mb-5 mt-10 text-xs">click to add to CONNECTIONS</h5>
        </div>

        <div className="flex m-4 flex-col w-[20em] items-center bg-orange-100">
          <h1 className="mb-5">CONNECTIONS</h1>

          <div className="flex flex-col w-full text-center">
            {/* {expl} */}
            { connectlist.length !== 0 ? connectlist.map((el, index) => (
              <div key={index} className="bg-pink-200 mb-2">
            {/*    {index} */} {el.firstname} {el.middlename} {el.lastname} <strong>{el.connectemail}</strong>
              </div>
            )):''}

          </div>

        </div>
      </div>
    </div>
  );
}
