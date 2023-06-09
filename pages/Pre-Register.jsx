import { React, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CotPic from "./Pics/Cot_panorama.png";
import CotSeal from "./Pics/Cot_seal.png";
import CotBrgy from "./Pics/Cotbrgy.png";

export default function PreRegister() {
  console.log("time: ", Date.now());
  // const{text2, setText2} = useState('')
  //     setText2 (text)
  const [baseURL, setBaseURL] = useState("");

  const [status, setStatus] = useState("regular");

  const [hideError, setHideError] = useState(true);
  const [showConfirmation, setshowConfirmation] = useState(true);

  const [type, setType] = useState("Reg");

  const [photoref, setPhotoref] = useState ('')

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [houselotnumber, setHouselotnumber] = useState("");
  const [purok, setPurok] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const [fathername, setFathername] = useState("");
  const [mothername, setMothername] = useState("");
  const [age, setAge] = useState("");
  const [civilstatus, setCivilstatus] = useState("");

  const [highesteducation, setHighesteducation] = useState("");
  const [schoolattended, setSchoolattended] = useState("");
  const [religion, setReligion] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [telephonenumber, setTelephonenumber] = useState("");
  const [dateregistered, setDateregistered] = useState("");
  const [connections, setConnections] = useState([]);

  // const [email, setEmail] = useState("juan@gmail.com");
  // const [password, setPassword] = useState("123456");
  // const [firstname, setFirstname] = useState("James");
  // const [lastname, setLastname] = useState("Macabulos");
  // const [middlename, setMiddlename] = useState("Demala");
  // const [nationality, setNationality] = useState("Filipino");
  // const [birthday, setBirthday] = useState("Dec. 12, 1992");
  // const [gender, setGender] = useState("Male");
  // const [houselotnumber, setHouselotnumber] = useState("B 15 L 21");
  // const [purok, setPurok] = useState("Maligaya");
  // const [barangay, setBarangay] = useState("Mabini");
  // const [city, setCity] = useState("Cotabato City");
  // const [occupation, setOccupation] = useState("employee");
  // const [company, setCompany] = useState("blue Jen");
  // const [fathername, setFathername] = useState("Benjamin Macabulos");
  // const [mothername, setMothername] = useState("Hermoine Macabulos");
  // const [age, setAge] = useState("29");
  // const [civilstatus, setCivilstatus] = useState("Married");
  // const [highesteducation, setHighesteducation] = useState("18");
  // const [schoolattended, setSchoolattended] = useState("MSU");
  // const [religion, setReligion] = useState("Protestant");
  // const [ethnicity, setEthnicity] = useState("Ilonggo");
  // const [contactnumber, setContactnumber] = useState("0912158419126");
  // const [telephonenumber, setTelephonenumber] = useState("18035156820");
  // const [dateregistered, setDateregistered] = useState("");
  // const [connections, setConnections] = useState([]);

  const [mainlist, setMainlist] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:3000/api/clients",
  });
  const api2 = axios.create({
    baseURL: "http://localhost:3000/api/clients/Profiling",
  });
  const api3 = axios.create({
    baseURL: "http://localhost:3000/api/post",
  });

  useEffect(() => {
    setBaseURL(localStorage.getItem("baseURL"));
  });

  // console.log("this is local storage email: ", localStorage.getItem("email"));
  const Savedb = async (e) => {
    e.preventDefault();
    //  const {email: email, password: password, firstname: firstname, lastname , middlename, nationality, birthday, gender,presentaddress , presentcity,
    //     permanentaddress, permanentcity, occupation, company, fathername, mothername } = req.body;
    try {
      const response = await axios.post(
        localStorage.getItem("baseURL") + "/api" + "/post",

        { email: email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("client: ", response);
      console.log("length: ", response.data.data.length);
      if (response.data.data.length === 1) {
        console.log("Email already use");
        setHideError(false);
        setshowConfirmation(false);
      } else {
        console.log("Email usable");
        setHideError(true);
        const client = await axios.post(
          baseURL + "/api" + "/register",
          // In the end, the backend will filter these available options on what goes to the
          // database or not so you can send as many as you want.
          {
            email: email,
            password: password,
            type: type,
            firstname: firstname,
            lastname: lastname,
            middlename: middlename,
            photoref : photoref,
            nationality: nationality,
            birthday: birthday,
            gender: gender,
            // presentaddress: presentaddress, presentcity: presentcity, permanentaddress: permanentaddress,
            // permanentcity: permanentcity,
            occupation: occupation,
            company: company,
            fathername: fathername,
            mothername: mothername,
            connections: connections,
            houselotnumber: houselotnumber,
            purok: purok,
            barangay: barangay,
            city: city,
            age: age,
            civilstatus: civilstatus,
            highesteducation: highesteducation,
            schoolattended: schoolattended,
            religion: religion,
            ethnicity: ethnicity,
            contactnumber: contactnumber,
            telephonenumber: telephonenumber,
            dateregistered: dateregistered,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("added client to database: ", client);
        if (client) {
          console.log("I am true");
          setshowConfirmation(true);
        }
      }
    } catch (error) {
      // console.error(error.response.data);
      console.log("Error at registering...");
    }
    // getData();
    //  alert('New Entry Created')
    // window.open(`/Profile?email=${email}`);
  };

  function Inchange_Email(e) {
    e.preventDefault();
    setEmail(e.target.value);
    setshowConfirmation(false);
  }
  function Inchange_Password(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }
  function Inchange_Firstname(e) {
    e.preventDefault();
    setFirstname(e.target.value);
  }
  function Inchange_Lastname(e) {
    e.preventDefault();
    setLastname(e.target.value);
  }
  function Inchange_Middlename(e) {
    e.preventDefault();
    setMiddlename(e.target.value);
  }
  function Inchange_Nationality(e) {
    e.preventDefault();
    setNationality(e.target.value);
  }
  function Inchange_Birthday(e) {
    e.preventDefault();
    setBirthday(e.target.value);
  }
  function Inchange_Gender(e) {
    e.preventDefault();
    setGender(e.target.value);
  }

  // function Inchange_Presentaddress(e){
  //   e.preventDefault();
  //   setPresentaddress(e.target.value)
  // }
  // function Inchange_Presentcity(e){
  //   e.preventDefault();
  //   setPresentcity(e.target.value)
  // }
  // function Inchange_Permanentaddress(e){
  //   e.preventDefault();
  //   setPermanentaddress(e.target.value)
  // }
  // function Inchange_Permanentcity(e){
  //   e.preventDefault();
  //   setPermanentcity(e.target.value)
  // }
  function Inchange_Occupation(e) {
    e.preventDefault();
    setOccupation(e.target.value);
  }
  function Inchange_Company(e) {
    e.preventDefault();
    setCompany(e.target.value);
  }
  function Inchange_Fathername(e) {
    e.preventDefault();
    setFathername(e.target.value);
  }
  function Inchange_Mothername(e) {
    e.preventDefault();
    setMothername(e.target.value);
  }

  function Inchange_Houselotnumber(e) {
    e.preventDefault();
    setHouselotnumber(e.target.value);
  }
  function Inchange_Purok(e) {
    e.preventDefault();
    setPurok(e.target.value);
  }
  function Inchange_Religion(e) {
    e.preventDefault();
    setReligion(e.target.value);
  }
  function Inchange_Barangay(e) {
    e.preventDefault();
    setBarangay(e.target.value);
  }
  function Inchange_City(e) {
    e.preventDefault();
    setCity(e.target.value);
  }
  function Inchange_Age(e) {
    e.preventDefault();
    setAge(e.target.value);
  }
  function Inchange_Civilstatus(e) {
    e.preventDefault();
    setCivilstatus(e.target.value);
  }
  function Inchange_Highesteducation(e) {
    e.preventDefault();
    setHighesteducation(e.target.value);
  }
  function Inchange_Schoolattended(e) {
    e.preventDefault();
    setSchoolattended(e.target.value);
  }

  function Inchange_Ethnicity(e) {
    e.preventDefault();
    setEthnicity(e.target.value);
  }
  function Inchange_Contactnumber(e) {
    e.preventDefault();
    setContactnumber(e.target.value);
  }
  function Inchange_Telephonenumber(e) {
    e.preventDefault();
    setTelephonenumber(e.target.value);
  }

  async function getData() {
    // const data = await api3.get(`/Inchange_Highesteducationclients`+`/`+credemail)
    const data = await api.get("http://localhost:3000/api" + "/post");
    // let clientslist = data.data.clients;
    //   setMainlist(data.data.clients.reverse())
    //   console.log(mainlist)
  }

  console.log(mainlist);
  return (
    <div className=" bg-blue-100 mt-10  flex-col flex items-center pb-10 min-h-[65%] absolute opacity-[94%] sm:scale-[80%]">
      <div className="flex flex-row mt-5 justify-around w-full">
        <Image src={CotSeal} height={70} width={70} alt="" />
        <Image src={CotBrgy} height={70} width={70} alt="" />
      </div>
      <div className="bg-blue-100 sm:flex-row flex-col flex">
        <div className=" bg-blue-100 h-auto pt-5  flex flex-col m-3">
          {/* <p className='text-center'> Registration Form</p> */}
          <p className="text-center"> E-mail *</p>
          <input
            className="m-2 text-center"
            value={email}
            onChange={Inchange_Email}
            placeholder="Juandelacruz@gmail.com"
          />
          <p className="text-center"> Password *</p>
          <input
            className="m-2 text-center"
            value={password}
            onChange={Inchange_Password}
            placeholder="************"
          />
          <p className="text-center"> First Name *</p>
          <input
            className="m-2 text-center"
            value={firstname}
            onChange={Inchange_Firstname}
            placeholder="Juan"
          />
          <p className="text-center"> Last Name *</p>
          <input
            className="m-2 text-center"
            value={lastname}
            onChange={Inchange_Lastname}
            placeholder="De la Cruz"
          />
          <p className="text-center"> Middle Name</p>
          <input
            className="m-2 text-center"
            value={middlename}
            onChange={Inchange_Middlename}
            placeholder="Magbanua"
          />
          <p className="text-center"> Nationality</p>
          <input
            className="m-2 text-center"
            value={nationality}
            onChange={Inchange_Nationality}
            placeholder="Filipino"
          />
          <p className="text-center"> Birthday</p>
          <input
            className="m-2 text-center"
            value={birthday}
            onChange={Inchange_Birthday}
            placeholder="MM-DD-YYYY"
          />
          <p className="text-center"> Gender</p>
          <input
            className="m-2 text-center"
            value={gender}
            onChange={Inchange_Gender}
            placeholder="Male"
          />
          <div className="flex flex-row justify-center pt-5">
            {/* <button className='bg-gray-400 w-20 mx-2 rounded-md'>Submit</button> */}
          </div>
        </div>

        <div className=" bg-blue-100 h-auto pt-5  flex flex-col m-3">
          {/* <p className='text-center'> Registration Form</p> */}
          {/* <p className='text-center'> Present Address</p>
      <input className='m-2 text-center' value={presentaddress} onChange={Inchange_Presentaddress}   placeholder='B12 L16 Susana Homes Subd.'/>
      <p className='text-center'> Present City</p>
      <input className='m-2 text-center' value={presentcity} onChange={Inchange_Presentcity}   placeholder='General Santos'/>
        <p className='text-center'> Permanent Address</p>
        <input className='m-2 text-center' value={permanentaddress} onChange={Inchange_Permanentaddress}   placeholder='Same as Pres '/>
        <p className='text-center'> Permanent City</p>
      <input className='m-2 text-center' value={permanentcity} onChange={Inchange_Permanentcity}   placeholder='General Santos'/> */}
          <p className="text-center"> House & Lot no.</p>
          <input
            className="m-2 text-center"
            value={houselotnumber}
            onChange={Inchange_Houselotnumber}
            placeholder="B 13 L 5 Soledad Subdivision"
          />
          <p className="text-center"> Purok </p>
          <input
            className="m-2 text-center"
            value={purok}
            onChange={Inchange_Purok}
            placeholder="Masagana"
          />
          <p className="text-center"> Barangay </p>
          <input
            className="m-2 text-center"
            value={barangay}
            onChange={Inchange_Barangay}
            placeholder="Village"
          />
          <p className="text-center"> City</p>
          <input
            className="m-2 text-center"
            value={city}
            onChange={Inchange_City}
            placeholder="Cotabato"
          />
          <p className="text-center"> Age</p>
          <input
            className="m-2 text-center"
            value={age}
            onChange={Inchange_Age}
            placeholder="31"
          />
          <p className="text-center"> Civil Status</p>
          <input
            className="m-2 text-center"
            value={civilstatus}
            onChange={Inchange_Civilstatus}
            placeholder="Single"
          />
          <p className="text-center"> Highest Education Attained</p>
          <input
            className="m-2 text-center"
            value={highesteducation}
            onChange={Inchange_Highesteducation}
            placeholder="Board Passer"
          />
          <p className="text-center"> School Attended</p>
          <input
            className="m-2 text-center"
            value={schoolattended}
            onChange={Inchange_Schoolattended}
            placeholder="Mindanao State University"
          />

          {/* <p className='text-center'> Education</p>
        <input className='m-2'/> */}
          {/* <div> {mainlist}</div> */}

          <div className="flex flex-row justify-center pt-5">
            {/* <button className='bg-gray-400 w-20 mx-2 rounded-md'>Submit</button> */}
          </div>
        </div>
        <div className=" bg-blue-100 h-auto pt-5  flex flex-col m-3">
          {/* <p className='text-center'> Registration Form</p> */}
          {/* <div className='flex flex-row justify-center pt-5 bg-blue-600'> */}
          <p className="text-center"> Religion</p>
          <input
            className="m-2 text-center"
            value={religion}
            onChange={Inchange_Religion}
            placeholder="Protestant"
          />
          <p className="text-center"> Ethnicity</p>
          <input
            className="m-2 text-center"
            value={ethnicity}
            onChange={Inchange_Ethnicity}
            placeholder="Ilonggo"
          />
          <p className="text-center"> Contact Number</p>
          <input
            className="m-2 text-center"
            value={contactnumber}
            onChange={Inchange_Contactnumber}
            placeholder="09112233445"
          />
          <p className="text-center"> Telephone Number</p>
          <input
            className="m-2 text-center"
            value={telephonenumber}
            onChange={Inchange_Telephonenumber}
            placeholder="0275432797"
          />
          <p className="text-center"> Occupation</p>
          <input
            className="m-2 text-center"
            value={occupation}
            onChange={Inchange_Occupation}
            placeholder="Manager"
          />
          <p className="text-center"> Company</p>
          <input
            className="m-2 text-center"
            value={company}
            onChange={Inchange_Company}
            placeholder="Fuji Films Pioneer Branch"
          />
          <p className="text-center"> Father`s Name</p>
          <input
            className="m-2 text-center"
            value={fathername}
            onChange={Inchange_Fathername}
            placeholder="Bonifacio Docallos"
          />
          <p className="text-center"> Mother`s Name</p>
          <input
            className="m-2 text-center"
            value={mothername}
            onChange={Inchange_Mothername}
            placeholder="Maria Soledad"
          />

          {/* <button className='bg-gray-400 w-20 mx-2 rounded-md'>Submit</button> */}
          {/* </div> */}
        </div>
      </div>

      <button onClick={Savedb} className="bg-gray-400 w-20 mx-2 rounded-xl p-2">
        Submit
      </button>
      <div className="mt-5 text-red-500">
        {hideError ? "" : "Error: Email already use"}
      </div>
      <div className="mt-5 text-violet-500">
        {showConfirmation ? `Adding ${email} to database` : ``}
      </div>
      {/* <button onClick={getData} className='bg-gray-400 w-20 mx-2 rounded-xl p-2'>Data</button> */}
    </div>
  );
}
