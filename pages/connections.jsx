import { React, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CotPic from "./Pics/Cot_panorama.png";
import CotSeal from "./Pics/Cot_seal.png";
import CotBrgy from "./Pics/Cotbrgy.png";

export default function Connections() {
  // const [explorelist, setExplorelist] = useState ('')
  const [explorelist, setExplorelist] = useState([]);

  const [mainlist, setMainlist] = useState([]);
  useEffect(() => {
    console.log("explore");
  });

  async function getData() {
    try {
      const { data } = await axios.post(
        localStorage.getItem("baseURL") + "/api/post",
        //Let's send these as body to the back-end
        { email: JSON.parse(localStorage.getItem("email")) },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("explorelist: ", data.data[0].connections);
      setExplorelist(data.data[0].connections);
      // return data
      //   if (data) {
      //     // console.log(data.data)
      //     //   const list = data.data
      //     //   console.log(list)
      //     setExplorelist(data.data);
      //   }
    } catch (err) {
      console.log(err);
    }

    // return data
  }

  // const list = ''
  useEffect(() => {
    //--> It's okay for me to  not useEffect,.okay! mindblown!
    // console.log('asdsadd',getData())
    getData();
  }, []); //--> The empty array makes the useEffect to execute only once && it works

  return (
    <div className="bg-pink-300 h-screen flex justify-center items-center relative ">
      <Image
        className="absolute w-screen relative"
        src={CotPic}
        layout="fill"
        alt=" "
      />
      <div
        className=" bg-blue-100 min-h-[80%] min-w-[40%] pt-5 px-5 rounded-md  flex flex-col
                absolute opacity-[94%]  items-center"
      >
        <h1>CONNECTIONS</h1>
        <div className="flex flex-col w-full justify-center">
          asd
          {/* {expl} */}
          {explorelist.map((el) => (
            <div
              key={el.connectemail}
              className="Ps5 controller text-center items-center justify-center flex"
            >
              {el.firstname} {el.middlename} {el.lastname}{" "}
              {/* {el.connectemail} */}
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
  );
}
