// This is the starting point for the web app.
// The user can either register or login.
// I don't think useEffect would be used really well here.
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router" ;
import CotPic from "./Pics/Cot_panorama.png"
import CotSeal from "./Pics/Cot_seal.png"
import CotBrgy from "./Pics/Cotbrgy.png"

import Profile from './Profile';


const Register = () => {

  const [baseURL, setBaseURL] = useState ('')
  // console.log ("Page location is: ",window.location.href )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [hideError, setHideError] = useState (true)

  const router = useRouter();

  useEffect(()=> {
    console.log ("Page location is: ",window.location.href ) ;
    setBaseURL (localStorage.setItem('baseURL', window.location.href)) ;
  })

  const SignIn = async () => {

        try {
        // Oh yeah! I forgot, this is the optimize way to send a "Post" to the back-end
        // await axios.get ()

        const response = await axios.post(window.location.href + "/api/pre-home"
        , {email: email , password: password}
        , {
          headers: {'Content-Type': 'application/json',  } }) ;
          console.log("response : ", response)
          console.log("response length: ", response.data.clients.length)
          // const credentialsExist = response.data.exists; // assumes that the server returns an object with a boolean property "exists"
            if (response.data.clients.length === 1) {
          //     // do something if the email and password combination exists
              setHideError (true) ;
              console.log('Authenticated set to true and yeah! user can log in.')
              localStorage.setItem('email', JSON.stringify(email));

              {window.open("/Profile")}
              // Profile(response);
              // This is too complicated. I'll use localstorage. I think I just need the e-mail.
              // window.open(`/Profile?response=${JSON.stringify(response.data)}`);
            } else {
              setHideError (false) ;
          //     // do something if the email and password combination does not exist
              console.log('Authenticated set to false .')
            }
            }
      catch (error) {
          console.log ("error...")
      // {console.error(error.response.data);
      //   // setAuthenticated (false)
                      };

    }


  function Inchange_Email(e){
    e.preventDefault();
    setEmail(e.target.value)
  }
  function Inchange_Password(e){
    e.preventDefault();
    setPassword(e.target.value)
  }



  return (
    // <div>
    <div className='bg-pink-300 h-screen flex justify-center items-center relative '>
 <Image className='absolute w-screen relative'
src={CotPic} layout="fill"
alt=' '  />
      <div className=' bg-blue-100 h-5/8 pt-5 px-5  flex flex-col absolute opacity-[94%]'>
      <div className='flex flex-row justify-around'>
        <Image src={CotSeal} height={70} width={70} alt='' />
        <Image src={CotBrgy} height={70} width={70} alt='' />
      </div>
      <p className='text-center'> E-mail</p>
        <input className='m-2'  value={email} onChange={Inchange_Email}  placeholder='Juandelacruz@gmail.com'/>
        <p className='text-center'> Password</p>
        <input className='m-2'  value={password} onChange={Inchange_Password}  placeholder='1234567'/>
        <div className='flex flex-row justify-center pt-5'>

            <button className='bg-gray-400 w-20 mx-2 rounded-md' onClick={function (){window.open("/Register")}} >Register</button>
            <button className='bg-gray-400 w-20 mx-2 rounded-md' onClick={SignIn}>Login</button>
        </div>
        <p className='text-center pt-10 text-red-500'>
        {hideError? " ":"Error: E-mail or Password not match."}
       </p>
      </div>

    {/* </div> */}

    </div>
  )
}

export default Register
