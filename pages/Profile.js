import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CotPic from "./Pics/Cot_panorama.png";
import PreRegister from "./Pre-Register.jsx";

console.log("hi");
export default function Profile() {
  const [baseURL, setBaseURL] = useState("");

  const [adminOn, setAdminOn] = useState(false);

  const [type, setType] = useState("");

  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [presentaddress, setPresentaddress] = useState("");
  const [presentcity, setPresentcity] = useState("");
  const [permanentaddress, setPermanentaddress] = useState("");
  const [permanentcity, setPermanentcity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const [fathername, setFathername] = useState("");
  const [mothername, setMothername] = useState("");

  if (typeof localStorage !== "undefined") {
    console.log("this is local storage email: ", localStorage.getItem("email"));
  } else {
    console.log("localStorage is not available");
  }

  // const getemail = (localStorage.getItem('email')) ;
  async function getProfile() {
    // if (getemail === undefined) {
    //   getemail = JSON.parse(localStorage.getItem('email'));
    // }
    try {
      const { data } = await axios.post(
        localStorage.getItem("baseURL") + "/api/post",
        { email: JSON.parse(localStorage.getItem("email")) },
        { headers: { "Content-Type": "application/json" } }
      );
      try {
        if (data) {
          console.log("data: ", data.data[0].gender);
          setEmail(data.data[0].email);
          setPassword(data.data[0].password);
          setType(data.data[0].type);
          setFirstname(data.data[0].firstname);
          setLastname(data.data[0].lastname);
          setMiddlename(data.data[0].middlename);
          setNationality(data.data[0].nationality);
          setBirthday(data.data[0].birthday);
          setGender(data.data[0].gender);
          setPresentaddress(data.data[0].presentaddress);
          setPresentcity(data.data[0].presentcity);
          setPermanentaddress(data.data[0].permanentaddress);
          setPermanentcity(data.data[0].permanentcity);
          setOccupation(data.data[0].occupation);
          setCompany(data.data[0].company);
          setFathername(data.data[0].fathername);
          setMothername(data.data[0].mothername);
        }
      } catch (error) {
        console.log("error");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  function Inchange_queryEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  useEffect(() => {
    if (type === "SuperAdmin" || type === "Admin") {
      setAdminOn(true);
    }
    // setEmail(JSON.parse(localStorage.getItem('email')));
    // setBaseURL(JSON.parse(localStorage.getItem('email')));
    console.log("this is base URL", baseURL); //--> For evaluation

    getProfile();
  }, [email]);

  const UpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`api/post`, {
          email: email,
          firstname: firstname,
          lastname: lastname,
          middlename: middlename,
          nationality: nationality,
          birthday: birthday,
          gender: gender,
          presentaddress: presentaddress,
          presentcity: presentcity,
          permanentaddress: permanentaddress,
          permanentcity: permanentcity,
          occupation: occupation,
          company: company,
          fathername: fathername,
          mothername: mothername,
        })
        .then(alert("Entry Updated"));
    } catch (error) {
      console.log(error);
    }
  };

  function ResetValues() {
    setFirstname("");
    setLastname("");
    setMiddlename("");
    setNationality("");
    setBirthday("");
    setGender("");
    setPresentaddress("");
    setPresentcity("");
    setPermanentaddress("");
    setPermanentcity("");
    setOccupation("");
    setCompany("");
    setFathername("");
    setMothername("");
  }

  function showParam(label, value, setValue) {
    // ResetValues()
    return (
      <div className="flex items-end justify-center pt-1 ">
        <h2 className="absolute left-[2%] hidden sm:block"> {label}: </h2>
        <h2 className=""> {value ? value : " <null value>"}</h2>

        {adminOn == false ? (
          ""
        ) : label === "email" ? (
          ""
        ) : (
          <input
            className="absolute right-[2%] w-[8em] hidden sm:block {}  "
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        {/* <div></div> */}
      </div>
    );
  }

  return (
    <div className="bg-violet-300 h-screen flex justify-center items-center">
      <Image
        className=" w-screen relative"
        src={CotPic}
        layout="fill"
        alt=" "
      />

      <div
        className=" w-[15em]  sm:min-w-[40em] bg-slate-300 sm:min-h-[80%] flex flex-col justify-center items-center
                  text-center absolute opacity-[96%]"
      >
        <div >
          {adminOn == true ? (
            <div>
              <h1>Welcome Admin </h1>
              <input id="queryEmail" className='w-[10em] sm:min-w-[15em]' onChange={Inchange_queryEmail} />{" "}
              <button
                onClick={function () {
                  const inputQuery = document.getElementById("queryEmail");
                  console.log(inputQuery.value);
                  // console.log(email) ;
                  localStorage.setItem(
                    "email",
                    JSON.stringify(inputQuery.value)
                  );
                  getProfile();
                }}
              >
                Search
              </button>
            </div>
          ) : (
            <div>
              <h1> Welcome User </h1>
            </div>
          )}

          <br />

          {showParam("email", email, setEmail)}
          {/* {showParam("password", password, setPassword)} */}
          {showParam("firstname", firstname, setFirstname)}
          {showParam("lastname", lastname, setLastname)}
          {showParam("middlename", middlename, setMiddlename)}
          {showParam("nationality", nationality, setNationality)}
          {showParam("birthday", birthday, setBirthday)}
          {showParam("gender", gender, setGender)}
          {showParam("present address", presentaddress, setPresentaddress)}
          {showParam("present city ", presentcity, setPresentcity)}
          {showParam(
            "permanent address",
            permanentaddress,
            setPermanentaddress
          )}
          {showParam("permanent city", permanentcity, setPermanentcity)}
          {showParam("occupation", occupation, setOccupation)}
          {showParam("father name", fathername, setFathername)}
          {showParam("mother name", mothername, setMothername)}
        </div>
        <div className=" w-[50%] justify-around flex mt-3">
          <button
            className="bg-blue-500 px-2 rounded-md  "
            onClick={ResetValues}
          >
            Clear
          </button>
          <button
            className="bg-blue-500 px-2 rounded-md  "
            onClick={UpdateProfile}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
