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

  const [mainlist, setMainlist] = useState([]);
  useEffect(() => {
    console.log("explore");
  });

  async function getData() {
    try {
      const { data } = await axios.post(
        localStorage.getItem("baseURL") + "/api/explore",
        //Let's send these as body to the back-end
        {
          lastname: "Macabulos",
          email: email,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      // return data
      if (data) {
        // console.log(data.data)
        //   const list = data.data
        //   console.log(list)
        setExplorelist(data.data);
      }
    } catch (err) {
      console.log(err);
    }

    // return data
  }

  // const list = ''
  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem("email")));
    //--> It's okay for me to  not useEffect,.okay! mindblown!
    // console.log('asdsadd',getData())
    getData();
  }, [email]); //--> The empty array makes the useEffect to execute only once && it works

  async function UpdateConnections(
    email,
    elemail,
    elfirstname,
    elmiddlename,
    ellastname
  ) {
    try {
      //   const newConnection = {
      //     email: email,
      //     connections: elemail,
      //     firstname: elfirstname,
      //     middlename: elmiddlename,
      //     lastname: ellastname,
      //   };
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
    } catch (err) {
      console.log(err);
    }
  }

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
                  console.log("updating");
                }}
              >
                {el.email} {el.firstname} {el.middlename} {el.lastname}
              </button>
            ))}
          </div>
          <h5 className="mb-5 mt-10 text-xs">click to add to CONNECTIONS</h5>
        </div>

        <div className="flex m-4 flex-col w-[20em] items-center bg-orange-100">
          <h1 className="mb-5">CONNECTIONS</h1>

          <div className="flex flex-col w-full text-center">
            {/* {expl} */}
            {explorelist.map((el) => (
              <div key={el.connectemail} className="bg-pink-200 mb-2">
                {el.firstname} {el.middlename} {el.lastname} {el.connectemail}
              </div>
            ))}
            {/* {explorelist.map((el) => (
            <button key={el.connectemail} className="bg-violet-500  mt-2">
              {el.connectemail}
            </button>
          ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
