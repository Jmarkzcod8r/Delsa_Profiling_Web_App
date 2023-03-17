import React, { useEffect, useState } from 'react'
import axios from "axios";
import Image from 'next/image';
import CotPic from "./Pics/Cot_panorama.png"

export default function Profile () {
    const [profile, setProfile] = useState ('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [nationality, setNationality] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [presentaddress, setPresentaddress] = useState('')
    const [presentcity, setPresentcity] = useState('')
    const [permanentaddress, setPermanentaddress] = useState('')
    const [permanentcity, setPermanentcity] = useState('')
    const [occupation, setOccupation] = useState('')
    const [company, setCompany] = useState('')
    const [fathername, setFathername] = useState('')
    const [mothername, setMothername] = useState('')


    if (typeof localStorage !== 'undefined') {
        console.log("this is local storage email: ", localStorage.getItem("email"));

    } else {
        console.log('localStorage is not available');
    }

    useEffect(() => {
        setEmail(JSON.parse(localStorage.getItem('email')));

        async function getProfile() {
          try {
            const { data } = await axios.post("http://localhost:3000/api/post", { email: email }, { headers: {'Content-Type': 'application/json' } });
            try {
            if (data) {
               console.log ("data: ", data.data[0].gender)
               setEmail (data.data[0].email)
               setPassword(data.data[0].password)
               setFirstname(data.data[0].firstname)
               setLastname(data.data[0].lastname)
               setMiddlename(data.data[0].middlename)
               setNationality(data.data[0].nationality)
               setBirthday(data.data[0].birthday)
               setGender(data.data[0].gender)
               setPresentaddress(data.data[0].presentaddress)
               setPresentcity(data.data[0].presentcity)
               setPermanentaddress(data.data[0].permanentaddress)
               setPermanentcity(data.data[0].permanentcity)
               setOccupation(data.data[0].occupation)
               setCompany(data.data[0].company)
               setFathername(data.data[0].fathername)
               setMothername(data.data[0].mothername)

            }   } catch (error)
            { console.log('error')}

          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        }

        getProfile();
      }, [email]);


    // useEffect(()=>{

    //     setEmail(JSON.parse(localStorage.getItem('email')) );
    //     async function getProfile () {
    //     //     const response = await axios.post("http://localhost:3000/api"+"/post"
    //     //  , {email: localStorage.getItem('email')}
    //     //  , {
    //     // headers: {'Content-Type': 'application/json',  } }) ;
    //     const data = await axios.post("http://localhost:3000/api/post"
    //     , {email: email}
    //     , {
    //       headers: {'Content-Type': 'application/json',  } }) ;
    //       console.log("data : ", data) ;

    //       const responseArray = Object.values(data);
    //       console.log("response Array : ", responseArray[0].data[0]) ;
    //     //   console.log("response Array 0: ", responseArray.data[0] );
    //       const Profile = responseArray[0].data[0] ;
    //       if (Profile !== "undefined") {
    //         console.log("Profile: ", Profile.email) ;
    //       }

    //     //   console.log("response Array : ", Profile.length) ;
    //     //   console.log("response Array bday: ", Profile.gender) ;
    //     //   const Profile2 = JSON.stringify(responseArray[0].data[0]) ;
    //     //   setProfile (Profile2)
    //     //   console.log("Profile2: ", Profile2) ;
    //     // //   setBirthday (responseArray[0].data[0].birthday) ;
    //     // //   setProfile (responseArray[0].data[0].birthday) ;
    //     //   console.log("response.company : ", Profile2.company)
    //     // //   console.log("response.gender : ", response.data.gender)
    //     // //   console.log("response.birthday : ", response.data.birthday)
    //     }
    //     getProfile()

    //   }, [email])

    return (
        <div className='bg-violet-300 h-screen flex justify-center items-center'>
             <Image className='absolute w-screen relative'
src={CotPic} layout="fill"
alt=' '  />
            <div className='w-[40%] bg-slate-300 min-h-[60%] flex flex-col
                  text-center absolute opacity-[96%]'>

            <h1> Profile Page: Welcome User</h1>
            {/* <h3> email:</h3> */}
            <h2>  {email}</h2>
            <h2> firstname: {firstname}</h2>
            <h2> {lastname}</h2>
            <h2> {middlename}</h2>
            <h2> {nationality}</h2>
            <h2> {birthday}</h2>
            <h2> {gender}</h2>
            <h2> {presentaddress}</h2>

            <h2> {presentcity}</h2>
            <h2> {permanentaddress}</h2>
            <h2> {permanentcity}</h2>
            <h2> {occupation}</h2>
            <h2> {company}</h2>
            <h2> {fathername}</h2>
            <h2> {middlename}</h2>

                {/* {email} {birthday} */}
            </div>


        </div>

    )
}