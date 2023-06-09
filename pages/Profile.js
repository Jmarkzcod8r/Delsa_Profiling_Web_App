import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CotPic from "./Pics/Cot_panorama.png";
import PreRegister from "./Pre-Register.jsx";
import { storage } from "../etc/etc/firebaseAPI.jsx";
// import Image from "next/image.js";as

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
// import { storage } from "./firebase";
import { v4 } from "uuid";

// console.log("hi");
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

  const [photoref, setPhotoref] = useState("");

  const [nationality, setNationality] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");

  const [presentaddress, setPresentaddress] = useState("");
  const [presentcity, setPresentcity] = useState("");
  const [permanentaddress, setPermanentaddress] = useState("");
  const [permanentcity, setPermanentcity] = useState("");

  const [houselotnum, setHouselotnum] = useState("");
  const [purok, setPurok] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [civilstatus, setCivilstatus] = useState("");

  const [highestedu, setHighestedu] = useState("");
  const [school, setSchool] = useState("");
  const [religion, setReligion] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [contactnum, setContactnum] = useState("");
  const [datareg, setDatereg] = useState("");
  const [telnum, setTelnum] = useState("");

  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const [fathername, setFathername] = useState("");
  const [mothername, setMothername] = useState("");

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentpic, setCurrentpic] = useState("");

  const [showFirst, setShowFirst] = useState(true);

  const toggleDivs = () => {
    setShowFirst(!showFirst);
  };

  const folderRef = ref(storage, "images/");

  // This uploads photo to firebase
  const uploadFile = () => {
    // if (imageUpload == null) return;
    // listAll(folderRef).then((response) => {
    //   console.log("current response: ", response);
    //   response.items.forEach((item, index) => {
    //     console.log("loc: ", item._location.path_);

    //     const deleteRef = ref(storage, item._location.path_);
    //     deleteObject(deleteRef);
    //   });
    // });

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setCurrentpic(url);
        setPhotoref(url);
        // console.log("this url: ",url)

        const handleUpload = async () => {
          // Send a POST request to your backend API endpoint to save the photo reference to MongoDB
          try {
            const response = await axios.post(`/api/addPhotoref`, {
              photoref: url,
              email: email,
            });
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };

        handleUpload();
      });
    });
  };
  //-------------------- cont uploadFile ---------------->

  // useEffect(() => {
  //   listAll(folderRef).then((response) => {
  //     console.log("current response: ", response);
  //     response.items.forEach((item, index) => {
  //       if (index === 0) {
  //         console.log("index: ", index),
  //           getDownloadURL(item).then((url) => {
  //             setPhotoref(url);
  //             setImageUrls((prev) => [...prev, url]);
  //           });
  //       }
  //     });
  //   console.log("photoref: ",photoref)
  //   });
  // }, []);

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
          setPhotoref(data.data[0].photoref);
          setNationality(data.data[0].nationality);
          setBirthday(data.data[0].birthday);
          setGender(data.data[0].gender);

          setHouselotnum(data.data[0].houselotnumber);
          setPurok(data.data[0].purok);
          setBarangay(data.data[0].barangay);
          setCity(data.data[0].city);
          setAge(data.data[0].age);
          setCivilstatus(data.data[0].civilstatus);
          setHighestedu(data.data[0].highesteducation);
          setSchool(data.data[0].schoolattended);
          setReligion(data.data[0].religion);
          setEthnicity(data.data[0].ethnicity);
          setContactnum(data.data[0].contactnumber);

          setDatereg(data.data[0].dateregistered);

          setTelnum(data.data[0].telephonenumber);

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
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("middlename", middlename);
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
    } ;
    location.reload()
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
      <div className="flex  w-full items-center pt-1 justify-around">

        <div className="absolute left-[2%] hidden sm:block"> {label}: </div>

        { adminOn == true ? (<div>&nbsp;</div>) : ( <div className="bg-red-200 justify-center items-center align-center flex ">
          {value ? value : " <null value>"}  </div>
          )}



        {adminOn == false ? (
          ""
        ) : label === "email" ? (
          ""
        ) : (
          <input
            className="absolute right-[3.5%] w-[19em] hidden sm:block {}  "
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        {/* <div></div> */}
      </div>
    );
  }

  function toggleChildren() {
    var child1 = document.querySelector("child1");
    var child2 = document.querySelector("child2");

    if (child1.style.display === "none") {
      child1.style.display = "block";
      child2.style.display = "none";
    } else {
      child1.style.display = "none";
      child2.style.display = "block";
    }
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
        className="min-w-full  md:min-w-[40%] sm:min-w-[60%] bg-gray-300 sm:min-h-[90%] flex flex-col  items-center
                  text-center absolute opacity-[96%] "
      >
        <div className="">
          {adminOn == true ? (
            <div>
              <h1>Welcome Admin </h1>
              <br />
              <input
                id="queryEmail"
                className="w-[10em] sm:min-w-[15em]"
                onChange={Inchange_queryEmail}
              />{" "}
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
              <br />
              <br />
            </div>
          ) : (
            <div className="flex">
              <div className="App flex flex-col justify-center">
                <h1> Welcome User </h1>

                <div className="flex  justify-center">
                  <Image
                    className=" "
                    src={photoref}
                    height={80}
                    width={80}
                    alt=" "
                  />
                </div>
                <div className="flex text-center">
                  <input
                    className="bg-blue-200 text-center"
                    type="file"
                    onChange={(event) => {
                      const selectedFile = event.target.files[0];
                      const fileSizeInBytes = selectedFile.size;
                      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
                      console.log(`File size: ${fileSizeInMB.toFixed(2)} MB`);
                      setImageUpload(selectedFile);
                      // console.log("selected file: ", selectedFile.name)
                      // setPhotoref(selectedFile);
                    }}
                  />

                  <button
                    className="bg-red-300 rounded-md "
                    onClick={uploadFile}
                  >
                    {" "}
                    &nbsp; Upload Image &nbsp;
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-center relative">
            <button
              onClick={function () {
                window.open("/explore");
              }}
              className="bg-blue-500 px-2 rounded-md m-3  "
              // onClick={UpdateProfile}
            >
              Explore
            </button>
            <button
              className="right-0 absolute bg-red-200 align-middle self-center rounded-md m-3"
              onClick={toggleDivs}
            >
              Toggle
            </button>
          </div>

          <div className={showFirst ? "block" : "hidden"}>
            {showParam("email", email, setEmail)}

            {showParam("firstname", firstname, setFirstname)}
            {showParam("lastname", lastname, setLastname)}
            {showParam("middlename", middlename, setMiddlename)}
            {showParam("nationality", nationality, setNationality)}
            {showParam("birthday", birthday, setBirthday)}
            {showParam("gender", gender, setGender)}
            {showParam("House & Lot no.",houselotnum, setHouselotnum) }
            {showParam("purok", purok, setPurok)}
            {showParam("barangay", barangay, setBarangay)}
          {showParam("city", city, setCity)}
          {showParam("age", age, setAge)}

            {/* {showParam("present address", presentaddress, setPresentaddress)}
            {showParam("present city ", presentcity, setPresentcity)}
            {showParam(
              "permanent address",
              permanentaddress,
              setPermanentaddress
            )}

            {showParam("permanent city", permanentcity, setPermanentcity)} */}

          </div>
          <div className={showFirst ? "hidden" : "block"}>

{/* const [highestedu, setHighestedu] = useState("");
  const [school, setSchool] = useState("");
  const [religion, setReligion] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [contactnum, setContactnum] = useState("");
  const [datareg, setDatereg] = useState("");
  const [telnum, setTelnum] = useState("");

  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const [fathername, setFathername] = useState("");
  const [mothername, setMothername] = useState(""); */}

  {showParam("civil status", civilstatus, setCivilstatus)}
            {showParam("occupation", occupation, setOccupation)}
            {showParam("highest education", highestedu, setHighestedu)}
            {showParam("school attended", school, setSchool)}


          {showParam("religion", religion, setReligion)}
          {showParam("ethnicity", ethnicity, setEthnicity)}
          {showParam("contact no.", contactnum, setContactnum)}
          {showParam("telephone no. ", telnum, setTelnum)}
          {showParam(
            "company",
            company,
            setCompany
          )}
          {/* {showParam("permanent city", permanentcity, setPermanentcity)} */}
          {/* {showParam("occupation", occupation, setOccupation)} */}
          {showParam("father name", fathername, setFathername)}
          {showParam("mother name", mothername, setMothername)}
            {/* No display */}
          </div>
        </div>
        {/* {type === "SuperAdmin" || type === "Admin" ? ( */}
        {adminOn == true ? (

          <div className=" w-[50%] justify-around flex mt-3">
            <button
              className="bg-blue-500 px-2 rounded-md  "
              onClick={ResetValues}
            >
              Clear
            </button>
            <button
              className="bg-blue-500 px-2 rounded-md  "
              onClick={UpdateProfile }
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            {/* <button
              onClick={function () {
                window.open("/explore");
              }}
              className="bg-blue-500 px-2 rounded-md mt-3 "
              // onClick={UpdateProfile}
            >
              Explore
            </button> */}
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
}
